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
};
