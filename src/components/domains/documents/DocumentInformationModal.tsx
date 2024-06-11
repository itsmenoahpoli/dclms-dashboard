import React from "react";
import { Modal, Tabs, Button, Badge } from "flowbite-react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { DocumentInformation, DocumentNoticesList, DocumentNoticeFormModal, DocumentUpdateInformationModal } from "@/components/domains/documents";
import { LoadingIndicator } from "@/components/shared";
import { DocumentsService } from "@/services";
import { useDialog } from "@/hooks";
import { IS_ORIGINATOR } from "@/constants";

type Props = {
  show: boolean;
  dataId?: number;
  handleClose: () => void;
};

export const DocumentInformationModal: React.FC<Props> = (props) => {
  const { showConfirm, closeConfirm, DialogComponent } = useDialog();

  const [documentInformation, setDocumentInformation] = React.useState<any>(null);
  const [noticeForm, setNoticeForm] = React.useState<any>({
    show: false,
    isDeletion: false,
  });
  const [infoForm, setInfoForm] = React.useState<any>({
    show: false,
  });
  const [updateStatusLoading, setUpdateStatusLoading] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    await DocumentsService.getDocument(props.dataId!).then((data) => setDocumentInformation(data));
  }, [props.dataId]);

  const checkApprovalStatus = () => {
    if (documentInformation) {
      const { documentNotices } = documentInformation;

      if (!documentNotices.length) {
        return false;
      }

      return documentNotices.filter((notice: any) => !notice.approvalDate).length === 0;
    }

    return false;
  };

  const checkDisableAddNotice = () => {
    if (IS_ORIGINATOR) return true;

    if (documentInformation?.documentNotices.length) {
      const notices = documentInformation.documentNotices;

      if (notices.length === 1) {
        return notices[0].approvedBy === null;
      }

      return notices[notices.length - 1].approvedBy === null;
    }

    return false;
  };

  const checkNoticesHasArchiveRequest = () => {
    const notices = documentInformation ? documentInformation.documentNotices : [];

    if (notices.length) {
      return notices.filter((notice: any) => notice.nature === "archive").length > 0;
    }

    return false;
  };

  const handleUpdateStatus = async (type: "approved" | "declined") => {
    setUpdateStatusLoading(true);

    if (type === "approved") {
      return await DocumentsService.approveDocument(documentInformation.id, setUpdateStatusLoading);
    }

    return await DocumentsService.declineDocument(documentInformation.id, setUpdateStatusLoading);
  };

  const handleNoticeForm = (isOpen: boolean, isDeletion: boolean = false) => {
    if (IS_ORIGINATOR && isDeletion) {
      console.log(IS_ORIGINATOR);
      return showConfirm({
        open: true,
        title: "Confirm",
        description: "Do you confirm to request this document to be archived?",
        onConfirm() {
          setNoticeForm({ show: isOpen, isDeletion });
        },
        onCancel() {
          closeConfirm();
        },
      });
    }

    setNoticeForm({ show: isOpen, isDeletion });
  };

  const handleInfoForm = (isOpen: boolean) => {
    setInfoForm({ show: isOpen });
  };

  const getDocumentStatus = () => {
    if (documentInformation.documentNotices?.length === 1) {
      return "pending";
    }

    if (documentInformation.documentNotices?.length > 1) {
      return "in-progress";
    }

    return documentInformation.status;
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";

      case "in-progress":
        return "blue";

      case "approved":
        return "green";

      case "archive":
        return "failure";

      default:
        return "blue";
    }
  };

  React.useEffect(() => {
    if (props.show) {
      fetchData();
    }

    return () => {
      setDocumentInformation(null);
    };
  }, [fetchData, props.show]);

  return (
    <>
      {DialogComponent}
      {documentInformation ? (
        <>
          <DocumentNoticeFormModal
            show={noticeForm.show}
            isDeletion={noticeForm.isDeletion}
            documentId={documentInformation.id}
            documentExternalUrl={documentInformation.externalUrl}
            sourceDocument={documentInformation.sourceDocument}
            fetchDocumentNotices={fetchData}
            handleClose={() => handleNoticeForm(false)}
          />

          <DocumentUpdateInformationModal
            show={infoForm.show}
            data={documentInformation}
            dataId={documentInformation.id}
            handleClose={() => handleInfoForm(false)}
          />
        </>
      ) : null}

      <Modal size="6xl" show={props.show} onClose={props.handleClose}>
        <Modal.Header>
          <div className="flex flex-row items-center gap-3">
            Document Information
            {documentInformation ? (
              <Badge className="max-w-[200px] mt-1" color={getBadgeColor(getDocumentStatus())}>
                <span className="uppercase">{getDocumentStatus()}</span>
              </Badge>
            ) : null}
          </div>
        </Modal.Header>
        <Modal.Body className="min-h-[70vh] px-0">
          {!documentInformation ? (
            <LoadingIndicator />
          ) : (
            <Tabs>
              <Tabs.Item title="General Data" active>
                <div className="pl-5">
                  <DocumentInformation documentInformation={documentInformation} />
                </div>
              </Tabs.Item>
              <Tabs.Item title="Document Notices (from DC/QMR)">
                <DocumentNoticesList
                  originatorName={documentInformation.originatorName}
                  documentNotices={documentInformation.documentNotices}
                  sourceDocumentType={documentInformation.sourceDocument}
                  refetch={fetchData}
                />
              </Tabs.Item>
            </Tabs>
          )}
        </Modal.Body>
        {documentInformation && documentInformation.status === "pending" ? (
          <Modal.Footer>
            <div className="w-full flex flex-row justify-between gap-3">
              <div className="flex flex-row justify-between gap-2">
                {documentInformation?.documentNotices ? (
                  <>
                    <Button
                      color="blue"
                      className="flex flex-row items-center"
                      disabled={checkDisableAddNotice()}
                      onClick={() => handleNoticeForm(true)}
                    >
                      <FiPlusCircle size={22} />
                      &nbsp; Add Revision Notice
                    </Button>

                    {IS_ORIGINATOR ? (
                      <Button
                        color="failure"
                        className="flex flex-row items-center"
                        disabled={checkNoticesHasArchiveRequest()}
                        onClick={() => handleNoticeForm(true, true)}
                      >
                        <FiTrash2 size={22} />
                        &nbsp; Archive
                      </Button>
                    ) : null}
                  </>
                ) : null}
              </div>

              <div className="flex flex-row gap-2">
                {/* {IS_ORIGINATOR ? (
                  <Button color="blue" className="flex flex-row items-center !bg-blue-900" onClick={() => handleInfoForm(true)}>
                    <FiEdit3 size={22} />
                    &nbsp; Update Information
                  </Button>
                ) : null} */}
                {!IS_ORIGINATOR && documentInformation && documentInformation.status === "pending" && checkApprovalStatus() ? (
                  <>
                    <Button color="success" onClick={() => handleUpdateStatus("approved")} disabled={updateStatusLoading}>
                      Approve Document
                    </Button>
                    <Button color="red" onClick={() => handleUpdateStatus("declined")} disabled={updateStatusLoading}>
                      Decline Document
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
};
