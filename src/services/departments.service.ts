import { toast } from "react-toastify";
import http from "@/api";

export const DepartmentsService = {
  getDepartmentsList: async function () {
    return await http
      .get("/departments")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get departments list");
      });
  },
};
