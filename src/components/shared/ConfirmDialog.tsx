import { Modal } from "flowbite-react";
import React from "react";

export type ConfirmDialogProps = {
  open?: boolean;
  title: string;
  description: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return (
    <Modal show={props.open} onClose={props.onCancel}>
      <Modal.Header>
        <span className="text-[16px]">{props.title}</span>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-gray-700">{props.description}</p>
      </Modal.Body>
      <Modal.Footer className="py-4 flex flex-row justify-end">
        <button type="button" className="h-[40px] px-4 rounded bg-red-500 text-white text-sm" onClick={props.onConfirm}>
          {props.confirmText ? props.confirmText : "Confirm"}
        </button>
        <button type="button" className="h-[40px] px-4 rounded border text-sm hover:bg-gray-100" onClick={props.onCancel}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
