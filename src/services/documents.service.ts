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

  getDocumentsByDepartmentList: async function (departmentId: number) {
    return await http
      .get("/documents/department/" + departmentId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get document list");
      });
  },

  getDocument: async function (id: number) {
    return await http
      .get("/documents/" + id)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get document information");
      });
  },

  createDocument: async function (documentData: any) {
    return await http
      .post("/documents", documentData)
      .then((response) => {
        toast.success("Document created");

        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error("Document name/url already used");
        } else {
          toast.error("Failed to create document");
        }
      });
  },
};
