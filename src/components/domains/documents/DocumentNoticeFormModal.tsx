import React from "react";
import { Modal, Button } from "flowbite-react";

type Props = {
  documentExternalUrl: string;
  show: boolean;
  handleClose: () => void;
};

export const DocumentNoticeFormModal: React.FC<Props> = (props) => {
  return (
    <Modal size="5xl" show={props.show} onClose={props.handleClose}>
      <Modal.Header>Document Notice Form</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-3 text-sm">
          <p>
            Document Reference:{" "}
            <a href="#" className="text-blue-700 underline">
              {props.documentExternalUrl}
            </a>
          </p>

          <hr />

          <div className="flex flex-row gap-3">
            <div className="w-full flex flex-col gap-1">
              <p>Source Document Type</p>
              <select>
                <option value="">--</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <p>Nature of Modification</p>
              <select>
                <option value="">--</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <p>Effectivity Date</p>
            <input type="date" />
          </div>

          <div className="w-full flex flex-col gap-1">
            <p>Details of Modification</p>
            <textarea rows={5} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button color="success">Submit Notice</Button>
        <Button color="light">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
