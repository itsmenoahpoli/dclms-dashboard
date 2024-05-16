import { toast } from "react-toastify";
import http from "@/api";

export const UsersService = {
  getUserRolesList: async function () {
    return await http
      .get("/user-roles")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get user roles list");
      });
  },

  getUsersList: async function () {
    return await http
      .get("/accounts")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get users list");
      });
  },

  updateUser: async function (id: number, userData: any) {
    return await http
      .patch("/accounts/" + id, { ...userData, userRoleId: +userData.userRoleId, departmentId: +userData.departmentId })
      .then((response) => {
        toast.info("Account successfully updated");
        return response.data;
      })
      .catch((error) => {
        console.log(error);

        toast.error("Failed to update user account");
      });
  },

  createUser: async function (userData: any) {
    return await http
      .post("/accounts", { ...userData, userRoleId: +userData.userRoleId, departmentId: +userData.departmentId })
      .then((response) => {
        toast.success("Account successfully created");
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 400) {
          toast.error("E-mail already used");
        } else {
          toast.error("Failed to delete/remove user account");
        }
      });
  },

  deleteUser: async function (id: number) {
    return await http
      .delete("/accounts/" + id)
      .then((response) => {
        toast.info("Account successfully deleted/removed");
        return response.data;
      })
      .catch((error) => {
        console.log(error);

        toast.error("Failed to delete/remove user account");
      });
  },
};
