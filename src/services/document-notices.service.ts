import { toast } from "react-toastify";
import http from "@/api";

export const DocumentNoticesService = {
  getDocumentNoticesByDocument: async function (documentId: number) {
    return await http
      .get("/document-notices/document/" + documentId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get document notices list");
      });
  },

  createDocumentNotice: async function (data: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/document-notices", { ...data, nature: data.nature.toLowerCase() })
      .then((response) => {
        toast.success("Successfully create document notice");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to create document notice");
      })
      .finally(() => setLoading(false));
  },

  approveDocumentNotice: async function (id: number, setApproveLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/document-notices/approve/" + id)
      .then((response) => {
        toast.success("Successfully approved document notice");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to approve document notice");
      })
      .finally(() => setApproveLoading(false));
  },

  createDocumentComplyNotice: async function (data: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/document-notices/comply/add", data)
      .then((response) => {
        toast.success("Successfully create document notice comply");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to create document notice comply");
      })
      .finally(() => setLoading(false));
  },

  updateDocumentNoticeComplyStatus: async function (data: any) {
    return await http
      .patch(`/document-notices/comply-notice/${data.documentNoticeComplyId}/${data.status}`)
      .then((response) => {
        toast.success("Successfully updated document notice comply status");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update document notice comply status");
      });
  },
};
