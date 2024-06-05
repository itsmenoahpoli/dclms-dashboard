import { toast } from "react-toastify";
import http from "@/api";

export const UsersService = {
  getUserRolesList: async function () {
    return await http
      .get("/user-roles")
      .then((response) => {
        if (response.data) {
          return response.data.filter((role: any) => role.name !== "superadmin");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get user roles list");
      });
  },

  createUserRole: async function (roleData: any) {
    return await http
      .post("/user-roles", roleData)
      .then((response) => {
        toast.success("Role successfully created");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 400) {
          toast.error("Role already exist");
        } else {
          toast.error("Failed to add role");
        }
      });
  },

  updateUserRole: async function (id: number, roleData: any) {
    return await http
      .patch("/user-roles/" + id, roleData)
      .then((response) => {
        toast.success("Role successfully updated");

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 400) {
          toast.error("Role already exist");
        } else {
          toast.error("Failed to update role");
        }
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

  createUser: async function (userData: any, closeModal: any) {
    userData.userRoleId = +userData.userRoleId;
    userData.departmentId = userData.departmentId ? +userData.departmentId : null;

    return await http
      .post("/accounts", userData)
      .then((response) => {
        toast.success("Account successfully created");
        closeModal();

        return response.data;
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          toast.error("E-mail/Name already associated with another account");
        } else {
          toast.error("Failed to add user account");
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
