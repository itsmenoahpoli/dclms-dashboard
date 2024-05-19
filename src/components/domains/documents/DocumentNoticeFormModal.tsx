import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "flowbite-react";
import { DocumentNoticesService } from "@/services";

type Props = {
  documentExternalUrl: string;
  sourceDocument: string;
  documentId: number;
  show: boolean;
  fetchDocumentNotices: () => void;
  handleClose: () => void;
};

const sourceDocumentTypes = ["Quality Management", "Procedures Manual", "Forms Manual", "Records Management Manual", "Document Information"].map(
  (type) => ({
    label: type,
    value: type,
  })
);

const modificationNatureTypes = ["Revision", "Addition", "Deletion"].map((type) => ({
  label: type,
  value: type.toLowerCase(),
}));

export const DocumentNoticeFormModal: React.FC<Props> = (props) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      documentId: +props.documentId,
      details: "",
      nature: "",
    },
  });

  const handleNoticeSubmit = handleSubmit(async (formData: any) => {
    await DocumentNoticesService.createDocumentNotice(formData).finally(() => reset());
    props.fetchDocumentNotices();
    props.handleClose();
  });

  return (
    <Modal size="5xl" show={props.show} onClose={props.handleClose}>
      <Modal.Header>Document Notice Form</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-3 text-sm" onSubmit={handleNoticeSubmit}>
          <p>
            Document Reference: &nbsp;
            <a href="#" className="text-blue-700 underline">
              {props.documentExternalUrl}
            </a>
          </p>

          <hr />

          <div className="flex flex-row gap-3">
            <div className="w-full flex flex-col gap-1">
              <p>Source Document Type</p>
              <select defaultValue={props.sourceDocument} disabled>
                <option value="">--</option>
                {sourceDocumentTypes.map((type) => (
                  <option value={type.value} key={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <p>Nature of Modification</p>
              <select {...register("nature")} required>
                <option value="">--</option>
                {modificationNatureTypes.map((type) => (
                  <option value={type.value} key={type.value}>
                    {type.value === "deletion" ? "Archive/Deletion" : type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <p>Details of Modification</p>
            <textarea rows={5} {...register("details")} required />
          </div>

          <div className="flex flex-row justify-end gap-3 mt-5">
            <Button color="success" type="submit">
              Submit Notice
            </Button>
            <Button color="light" onClick={props.handleClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
