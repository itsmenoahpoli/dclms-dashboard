import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Spinner } from "flowbite-react";
import { DocumentNoticesService } from "@/services";
import { IS_ORIGINATOR } from "@/constants";

type Props = {
  documentExternalUrl: string;
  sourceDocument: string;
  documentId: number;
  show: boolean;
  isDeletion?: boolean;
  fetchDocumentNotices: () => void;
  handleClose: () => void;
};

const sourceDocumentTypes = ["Quality Management", "Procedures Manual", "Forms Manual", "Records Management Manual", "Document Information"].map(
  (type) => ({
    label: type,
    value: type,
  })
);

export const DocumentNoticeFormModal: React.FC<Props> = (props) => {
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      documentId: +props.documentId,
      details: "",
      nature: "revision",
      externalUrl: "",
      pageNumber: "",
    },
  });

  const [validLink, setValidLink] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleNoticeSubmit = handleSubmit(async (formData: any) => {
    setLoading(true);

    if (!IS_ORIGINATOR) {
      formData["requestedBy"] = "Document Controller";
      formData["type"] = "document-controller-request";
    }

    await DocumentNoticesService.createDocumentNotice(formData, setLoading).finally(() => reset());
    props.fetchDocumentNotices();
    props.handleClose();
  });

  const handleValidateDocumentLink = (link: string) => {
    console.log(link);
    setValidLink(true);
    // if (link.includes("https://hauph-my.sharepoint.com")) {
    //   setValidLink(true);

    //   return;
    // }

    // setValidLink(false);
  };

  React.useEffect(() => {
    if (props.isDeletion) {
      setValue("nature", "Archive");
    } else {
      setValue("nature", "Revision");
    }
  }, [setValue, props.isDeletion]);

  return (
    <Modal size="5xl" show={props.show} onClose={props.handleClose}>
      <Modal.Header>Document Notice Form</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-3 text-sm" onSubmit={handleNoticeSubmit}>
          <p>
            Document Reference: &nbsp;
            <a href={props.documentExternalUrl} className="text-blue-700 underline" target="_blank">
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
              <input {...register("nature")} readOnly required />
            </div>
          </div>

          {IS_ORIGINATOR ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                <span className="text-red-600 mr-1">*</span>
                External Link/URL
              </p>
              {!validLink ? <p className="text-xs text-red-600">Must be a valid HAU sharepoint url</p> : null}
              <input type="url" {...register("externalUrl")} onChange={(e) => handleValidateDocumentLink(e.target.value)} required />
              <p className="text-xs text-gray-600">Make sure the url is public</p>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Page Number
            </p>
            <input type="number" defaultValue={0} {...register("pageNumber")} required />
          </div>

          <div className="w-full flex flex-col gap-1">
            <p>Details of Modification</p>
            <textarea rows={5} {...register("details")} required />
          </div>

          <div className="flex flex-row justify-end gap-3 mt-5">
            <Button color="success" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Submit Notice"}
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
