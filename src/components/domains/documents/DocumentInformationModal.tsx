import React from "react";
import { Modal, Tabs, Button } from "flowbite-react";
import { FiPlusCircle } from "react-icons/fi";
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
  const IS_NOT_ORIGINATOR = roleUtils.checkRole(USER_ROLES.DC) || roleUtils.checkRole(USER_ROLES.QMR);

  const [documentInformation, setDocumentInformation] = React.useState<any>(null);
  const [noticeForm, setNoticeForm] = React.useState<any>({
    show: false,
  });

  const fetchData = React.useCallback(async () => {
    await DocumentsService.getDocument(props.dataId!).then((data) => setDocumentInformation(data));
  }, [props.dataId]);

  const handleNoticeForm = (isOpen: boolean) => {
    setNoticeForm({ show: isOpen });
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
          documentExternalUrl={documentInformation.externalUrl}
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
              <Tabs.Item title="General Data">
                <DocumentInformation documentInformation={documentInformation} />
              </Tabs.Item>
              <Tabs.Item title="Document Notices (from DC/QMR)" active>
                <DocumentNoticesList documentNotices={documentInformation.documentNotices} sourceDocumentType={documentInformation.sourceDocument} />
              </Tabs.Item>
            </Tabs>
          )}
        </Modal.Body>
        <Modal.Footer>
          {IS_NOT_ORIGINATOR ? (
            <div className="w-full flex flex-row justify-between gap-3">
              <Button color="blue" className="flex flex-row items-center" onClick={() => handleNoticeForm(true)}>
                <FiPlusCircle size={22} />
                &nbsp; Request Notice
              </Button>

              <div className="flex flex-row gap-2">
                <Button color="green">Approve</Button>
                <Button color="red">Decline</Button>
              </div>
            </div>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};
