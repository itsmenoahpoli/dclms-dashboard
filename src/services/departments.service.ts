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

  deleteDepartment: async function (id: number) {
    return await http
      .delete("/departments/" + id)
      .then((response) => {
        toast.success("Successfully deleted department");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete department");
      });
  },

  createDepartment: async function (data: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/departments/", data)
      .then((response) => {
        toast.success("Successfully added department");

        return response.data;
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          toast.error("Details already associated with an existing department");
        } else {
          toast.error("Failed to add department");
        }
      })
      .finally(() => setLoading(false));
  },
};
