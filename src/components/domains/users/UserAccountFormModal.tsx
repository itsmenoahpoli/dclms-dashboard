import React from "react";
import _ from "lodash";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, Modal } from "flowbite-react";
import { DepartmentsService, UsersService } from "@/services";
import { stringsUtils } from "@/utils";

type Props = {
  show: boolean;
  formType: "add" | "update";
  refetch: () => void;
  handleClose: () => void;
};

export const UserAccountFormModal: React.FC<Props> = (props) => {
  const { handleSubmit, register, getValues, setValue, watch } = useForm();

  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryKey: ["data-departments"],
    queryFn: async () => await DepartmentsService.getDepartmentsList(),
  });

  const { data: userRoles, isLoading: userRolesLoading } = useQuery({
    queryKey: ["data-user-roles"],
    queryFn: async () => await UsersService.getUserRolesList(),
  });

  const usernameParams = watch(["name", "departmentId"]);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleCreateUsername = React.useCallback(
    (name: string, department: string) => {
      if (name && department) {
        const matchedDepartment = departments.find((dept: any) => dept.id === +department);
        const departmentAcro = stringsUtils.makeArcronyms(matchedDepartment.name);
        const lastname = name.length > 0 ? name.split(" ")[name.split(" ").length - 1] : name;
        const uid = String(moment().unix()).substring(0, 5);

        const username = `${departmentAcro}-${lastname}-${uid}`;
        const password = username.toLowerCase().replaceAll("-", "");

        setUsername(username);
        setValue("username", username);
        setPassword(password);
        setValue("password", password);
      }
    },
    [departments, setValue]
  );

  const handleSubmitForm = handleSubmit(async (formData) => {
    await UsersService.createUser(formData);
  });

  React.useEffect(() => {
    handleCreateUsername(getValues("name"), getValues("departmentId"));
  }, [usernameParams, handleCreateUsername, getValues]);

  return (
    <Modal show={props.show} onClose={props.handleClose}>
      <Modal.Header>Account Details</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-5" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-2">
            <p className="text-sm">E-mail</p>
            <input type="email" {...register("email")} required />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Full Name</p>
            <input type="text" {...register("name")} required />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Department</p>
            {departmentsLoading ? (
              "Fetching departments ..."
            ) : (
              <select {...register("departmentId")} required>
                <option value="">--</option>
                {departments.map((department: any) => (
                  <option value={department.id} key={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Account Type</p>
            {userRolesLoading ? (
              "Fetching account types ..."
            ) : (
              <select {...register("userRoleId")} required>
                <option value="">--</option>
                {userRoles.map((userRole: any) => (
                  <option value={userRole.id} key={userRole.name}>
                    {_.startCase(userRole.name)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Username</p>
            <input type="text" defaultValue={username} {...register("username")} required />
            <small className="text-gray-500">{"Default format - {department}-{lastname}-{any unique identifier}"}</small>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Default Password</p>
            <input type="text" defaultValue={password} {...register("password")} required />
          </div>

          <div className="flex flex-row justify-end gap-3">
            <Button color="success" type="submit">
              {props.formType === "add" ? "Create" : "Update"} Account
            </Button>
            <Button color="light" onClick={props.handleClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
