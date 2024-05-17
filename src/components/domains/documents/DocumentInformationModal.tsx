import React from "react";
import { Modal, Tabs, Button } from "flowbite-react";
import { FiPlusCircle } from "react-icons/fi";
import { DocumentInformation, DocumentNoticesList } from "@/components/domains/documents";
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

  const fetchData = React.useCallback(async () => {
    await DocumentsService.getDocument(props.dataId!).then((data) => setDocumentInformation(data));
  }, [props.dataId]);

  React.useEffect(() => {
    if (props.show) {
      fetchData();
    }

    return () => {
      setDocumentInformation(null);
    };
  }, [fetchData, props.show]);

  return (
    <Modal show={props.show} onClose={props.handleClose}>
      <Modal.Header>Document Information</Modal.Header>
      <Modal.Body className="min-h-[70vh] px-0">
        {!documentInformation ? (
          "Fetching"
        ) : (
          <Tabs>
            <Tabs.Item title="General Data" active>
              <DocumentInformation documentInformation={documentInformation} />
            </Tabs.Item>
            <Tabs.Item title="Document Notices (from DC/QMR)">
              <DocumentNoticesList documentNotices={documentInformation.documentNotices} />
            </Tabs.Item>
          </Tabs>
        )}
      </Modal.Body>
      <Modal.Footer>
        {IS_NOT_ORIGINATOR ? (
          <div className="w-full flex flex-row justify-end gap-3">
            <Button color="blue" className="flex flex-row items-center">
              <FiPlusCircle size={22} />
              &nbsp; Request Notice
            </Button>
            <Button color="green">Approve</Button>
            <Button color="red">Decline</Button>
          </div>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};
