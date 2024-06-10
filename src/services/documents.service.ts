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

  getArchivedDocumentsList: async function () {
    return await http
      .get("/documents/archived")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get archived document list");
      });
  },

  getDocumentsListByStatus: async function (status: string | null) {
    if (!status) {
      return await this.getDocumentsList();
    }

    return await http
      .get("/documents/status/" + status)
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

  getArchivedDocumentsByDepartmentList: async function (departmentId: number) {
    return await http
      .get("/documents/archived/department/" + departmentId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get archived document list");
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

  updateDocument: async function (id: number, formData: any) {
    return await http
      .patch("/documents/" + id, formData)
      .then((response) => {
        toast.success("Document created");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update document information");
      });
  },

  approveDocument: async function (id: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/documents/approve/" + id)
      .then((response) => {
        toast.success("Document approved");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to approve document");
      })
      .finally(() => setLoading(false));
  },

  declineDocument: async function (id: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/documents/decline/" + id)
      .then((response) => {
        toast.success("Document approved");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to approve document");
      })
      .finally(() => setLoading(false));
  },

  createDocument: async function (documentData: any) {
    return await http
      .post("/documents", { ...documentData, totalPages: +documentData.totalPages })
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
