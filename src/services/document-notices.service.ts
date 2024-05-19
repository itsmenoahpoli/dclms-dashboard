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
};
