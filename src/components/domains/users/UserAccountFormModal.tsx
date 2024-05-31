import React from "react";
import _ from "lodash";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, Modal, Spinner } from "flowbite-react";
import { DepartmentsService, UsersService } from "@/services";

type Props = {
  show: boolean;
  formType: "add" | "update";
  data?: any;
  refetch: () => void;
  handleClose: () => void;
};

export const UserAccountFormModal: React.FC<Props> = (props) => {
  const { handleSubmit, register, getValues, setValue, watch, reset } = useForm();

  const { data: departments, isFetching: departmentsLoading } = useQuery({
    queryKey: ["data-departments"],
    queryFn: async () => await DepartmentsService.getDepartmentsList(),
  });

  const { data: userRoles, isFetching: userRolesLoading } = useQuery({
    queryKey: ["data-user-roles"],
    queryFn: async () => await UsersService.getUserRolesList(),
  });

  const usernameParams = watch(["name", "departmentId"]);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleCreateUsername = React.useCallback(
    (name: string, department: string) => {
      if (name && department) {
        const matchedDepartment = departments.find((dept: any) => dept.id === +department);
        const lastname = name.length > 0 ? name.split(" ")[name.split(" ").length - 1] : name;
        const uid = String(moment().unix()).substring(0, 5);

        const username = `${matchedDepartment.title}-${lastname}-${uid}`.toLowerCase();
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
    setLoading(true);

    if (props.formType === "add") {
      reset();
      setValue("username", "");
      setValue("password", "");
      await UsersService.createUser(formData);
    } else {
      delete formData.password;
      await UsersService.updateUser(formData.id, formData);
    }

    props.refetch();
    props.handleClose();
    setLoading(false);
  });

  const transformRoleLabel = (name: string) => {
    if (name === "originator-per-document") {
      return "Originator";
    }

    return name;
  };

  React.useEffect(() => {
    handleCreateUsername(getValues("name"), getValues("departmentId"));
  }, [usernameParams, getValues, handleCreateUsername]);

  React.useEffect(() => {
    // SET FORM VALUES BASED ON PROPS.DATA
    if (props.data) {
      for (const [key, value] of Object.entries(props.data)) {
        // @ts-ignore
        if (key === "userRole") setValue(key, props.data.userRole.id);
        if (key === "email") setValue(key, props.data.email.toLowerCase().replaceAll(" ", "-"));
        if (key === "username") setValue(key, props.data.username.toLowerCase());
        else setValue(key, value);
      }
    }
  }, [props.data, setValue]);

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
              <select {...register("departmentId")}>
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
                {userRoles
                  .filter((userRole: any) => userRole.name !== "superadmin")
                  .map((userRole: any) => (
                    <option value={userRole.id} key={userRole.name}>
                      {_.startCase(transformRoleLabel(userRole.name))}
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

          {props.formType === "add" ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm">Default Password</p>
              <input type="text" defaultValue={password} {...register("password")} required />
            </div>
          ) : null}

          <div className="flex flex-row justify-end gap-3">
            <Button color="success" type="submit" disabled={loading}>
              {loading ? <Spinner /> : props.formType === "add" ? "Create Account" : "Update Account"}
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
