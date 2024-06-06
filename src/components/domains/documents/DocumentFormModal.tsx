import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Spinner } from "flowbite-react";
import { useAuthStore } from "@/stores";
import { DocumentsService } from "@/services";

type Props = {
  show: boolean;
  formType: "add" | "update";
  data?: any;
  refetch: () => void;
  handleClose: () => void;
};

const sourceDocumentTypes = ["Quality Management", "Procedures Manual", "Forms Manual", "Records Management Manual", "Document Information"].map(
  (type) => ({
    label: type,
    value: type,
  })
);

export const DocumentFormModal: React.FC<Props> = (props) => {
  const { user } = useAuthStore();
  const { handleSubmit, register, reset } = useForm();

  const [validLink, setValidLink] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmitForm = handleSubmit(async (formData: any) => {
    setLoading(true);

    if (props.formType === "add") {
      const originatorData = {
        originatorUserId: user!.id,
        departmentId: user!.departmentId,
      };

      await DocumentsService.createDocument({ ...formData, ...originatorData }).finally(() => {
        props.refetch();
        props.handleClose();
        reset();
        setLoading(false);
      });
    }
  });

  const handleValidateDocumentLink = (link: string) => {
    setValidLink(true);
    // if (link.includes("https://hauph-my.sharepoint.com")) {
    //   setValidLink(true);

    //   return;
    // }

    // setValidLink(false);
  };

  return (
    <Modal show={props.show} onClose={props.handleClose}>
      <Modal.Header>{props.formType === "add" ? "Create" : "Update"} Document Form</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-5" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Name
            </p>
            <input {...register("name")} required />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              External Link/URL
            </p>
            {!validLink ? <p className="text-xs text-red-600">Must be a valid HAU sharepoint url</p> : null}
            <input type="url" {...register("externalUrl")} onChange={(e) => handleValidateDocumentLink(e.target.value)} required />
            <p className="text-xs text-gray-600">Make sure the url is public</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Total Pages
            </p>
            <input type="number" defaultValue={0} {...register("totalPages")} required />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Source Document
            </p>
            <select {...register("sourceDocument")} required>
              <option value="">--</option>
              {sourceDocumentTypes.map((type) => (
                <option value={type.value} key={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-end gap-3">
            <Button color="success" type="submit" disabled={loading || !validLink}>
              {loading ? <Spinner /> : props.formType === "add" ? "Create Document" : "Update Document"}
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
