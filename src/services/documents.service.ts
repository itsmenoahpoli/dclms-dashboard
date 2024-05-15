import { toast } from "react-toastify";
import http from "@/api";

export const DocumentsService = {
  getDocumentsList: async function () {
    return await http
      .get("/documents")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get document list");
      });
  },
};
