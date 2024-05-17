import React from "react";
import { Modal, Tabs } from "flowbite-react";
import { DocumentInformation, DocumentNoticesList } from "@/components/domains/documents";
import { DocumentsService } from "@/services";

type Props = {
  show: boolean;
  dataId?: number;
  handleClose: () => void;
};

export const DocumentInformationModal: React.FC<Props> = (props) => {
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
      <Modal.Body className="min-h-[100vh]  px-0">
        {!documentInformation ? (
          "Fetching"
        ) : (
          <Tabs>
            <Tabs.Item title="General Data" active>
              <DocumentInformation documentInformation={documentInformation} />
            </Tabs.Item>
            <Tabs.Item title="Document Notices (from DC/QMR)">
              <DocumentNoticesList />
            </Tabs.Item>
          </Tabs>
        )}
      </Modal.Body>
    </Modal>
  );
};
