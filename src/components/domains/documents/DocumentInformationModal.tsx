import React from "react";
import { Modal, Tabs, Button } from "flowbite-react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { DocumentInformation, DocumentNoticesList, DocumentNoticeFormModal } from "@/components/domains/documents";
import { LoadingIndicator } from "@/components/shared";
import { DocumentsService } from "@/services";
import { roleUtils } from "@/utils";
import { USER_ROLES } from "@/constants";

type Props = {
  show: boolean;
  dataId?: number;
  handleClose: () => void;
};

export const DocumentInformationModal: React.FC<Props> = (props) => {
  const [documentInformation, setDocumentInformation] = React.useState<any>(null);
  const [noticeForm, setNoticeForm] = React.useState<any>({
    show: false,
    isDeletion: false,
  });

  const IS_NOT_ORIGINATOR = roleUtils.checkRole(USER_ROLES.DC) || roleUtils.checkRole(USER_ROLES.QMR);

  const checkApprovalStatus = () => {
    const { documentNotices } = documentInformation;

    if (!documentNotices.length) {
      return false;
    }

    return documentNotices.filter((notice: any) => notice.approvalDate === null).length > 0 ? true : false;
  };

  const checkDisableAddNotice = () => {
    if (documentInformation?.documentNotices.length) {
      const notices = documentInformation.documentNotices;

      if (notices.length === 1) {
        return notices[0].approvedBy === null;
      }

      return notices[notices.length - 1].approvedBy === null;
    }

    return false;
  };

  const fetchData = React.useCallback(async () => {
    await DocumentsService.getDocument(props.dataId!).then((data) => setDocumentInformation(data));
  }, [props.dataId]);

  const handleNoticeForm = (isOpen: boolean, isDeletion: boolean = false) => {
    setNoticeForm({ show: isOpen, isDeletion });
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
      {documentInformation ? (
        <DocumentNoticeFormModal
          show={noticeForm.show}
          isDeletion={noticeForm.isDeletion}
          documentId={documentInformation.id}
          documentExternalUrl={documentInformation.externalUrl}
          sourceDocument={documentInformation.sourceDocument}
          fetchDocumentNotices={fetchData}
          handleClose={() => handleNoticeForm(false)}
        />
      ) : null}

      <Modal size="3xl" show={props.show} onClose={props.handleClose}>
        <Modal.Header>Document Information</Modal.Header>
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
                <DocumentNoticesList documentNotices={documentInformation.documentNotices} sourceDocumentType={documentInformation.sourceDocument} />
              </Tabs.Item>
            </Tabs>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex flex-row justify-between gap-3">
            <div className="flex flex-row gap-2">
              {documentInformation?.documentNotices ? (
                <Button color="blue" className="flex flex-row items-center" disabled={checkDisableAddNotice()} onClick={() => handleNoticeForm(true)}>
                  <FiPlusCircle size={22} />
                  &nbsp; Add Revision Notice
                </Button>
              ) : null}

              <Button color="failure" className="flex flex-row items-center" onClick={() => handleNoticeForm(true, true)}>
                <FiTrash2 size={22} />
                &nbsp; Archive
              </Button>
            </div>

            <div className="flex flex-row gap-2">
              {IS_NOT_ORIGINATOR && documentInformation && checkApprovalStatus() ? (
                <>
                  <Button color="green">Approve</Button>
                  <Button color="red">Decline</Button>
                </>
              ) : null}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
