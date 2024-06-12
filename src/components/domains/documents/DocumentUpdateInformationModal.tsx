import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Spinner } from "flowbite-react";
import { DocumentsService } from "@/services";

type Props = {
  show?: boolean;
  data: any;
  dataId: number;
  handleClose: () => void;
};

export const DocumentUpdateInformationModal: React.FC<Props> = (props) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: props.data.name,
      externalUrl: props.data.externalUrl,
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmitForm = handleSubmit(async (formData: any) => {
    setLoading(true);

    await DocumentsService.updateDocument(props.dataId, formData);
  });

  return (
    <Modal size="2xl" show={props.show} onClose={props.handleClose}>
      <Modal.Header>Update Document Information</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-5" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Name</p>
            <input {...register("name")} required />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">External Link/URL</p>
            <input {...register("externalUrl")} required />
          </div>

          <div className="flex flex-row justify-end gap-3">
            <Button color="success" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Update Document"}
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
