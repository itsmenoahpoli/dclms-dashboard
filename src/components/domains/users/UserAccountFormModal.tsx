import React from "react";
import _ from "lodash";
import moment from "moment";
import PasswordStrengthBar from "react-password-strength-bar";
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
  const [userDepartmentDisabled, setDepartmentDisabled] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = React.useState<number>(0);

  const generateUniquePassword = (length: number = 16) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-=_+";

    let result = "";
    for (let i = 0; i < length; i++) {
      // Get a random index within the charset length
      const randomIndex = Math.floor(Math.random() * charset.length);
      // Extract the character at the random index
      const randomChar = charset[randomIndex];
      // Add the character to the result string
      result += randomChar;
    }

    return result;
  };

  const handleCreatePassword = () => {
    const password = generateUniquePassword();

    setPassword(password);
    setValue("password", password);
  };

  const handleCreateUsername = React.useCallback(
    (name: string, department: string) => {
      if (name && department) {
        const matchedDepartment = departments.find((dept: any) => dept.id === +department);
        const lastname = name.length > 0 ? name.split(" ")[name.split(" ").length - 1] : name;
        const uid = String(moment().unix()).substring(0, 5);
        const username = `${matchedDepartment.title}-${lastname}-${uid}`.toLowerCase();

        setUsername(username);
        setValue("username", username);
      }
    },
    [departments, setValue]
  );

  const handleSetPasswordStrength = (strength: number) => {
    setPasswordStrength(strength);
  };

  const handleSubmitForm = handleSubmit(async (formData) => {
    setLoading(true);

    if (props.formType === "add") {
      reset();
      setValue("username", "");
      setValue("password", "");
      await UsersService.createUser(formData, props.handleClose());
    } else {
      delete formData.password;
      await UsersService.updateUser(formData.id, formData);
    }

    props.refetch();
    setLoading(false);
  });

  const transformRoleLabel = (name: string) => {
    if (name === "originator-per-document") {
      return "Originator";
    }

    return name;
  };

  const handleSelectUserRole = (userRoleId: number) => {
    if (userRoleId && +userRoleId === 2) {
      setValue("departmentId", 3);
      setDepartmentDisabled(true);
    } else {
      setValue("departmentId", null);
      setDepartmentDisabled(false);
    }
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
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Account Type
            </p>
            {userRolesLoading ? (
              "Fetching account types ..."
            ) : (
              <select {...register("userRoleId")} onChange={(e) => handleSelectUserRole(+e.target.value)} required>
                <option value="">--</option>
                {userRoles
                  .filter((userRole: any) => userRole.name !== "superadmin" && userRole.name !== "quality-management-representative")
                  .map((userRole: any) => (
                    <option value={userRole.id} key={userRole.name}>
                      {_.startCase(transformRoleLabel(userRole.name))}
                    </option>
                  ))}
              </select>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Department
            </p>

            {departmentsLoading ? (
              "Fetching departments ..."
            ) : (
              <select {...register("departmentId")} disabled={userDepartmentDisabled}>
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
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Full Name
            </p>
            <input type="text" {...register("name")} required />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Username
            </p>

            <input type="text" defaultValue={username} {...register("username")} required />
            <small className="text-gray-500">{"Default format - {department}-{lastname}-{any unique identifier}"}</small>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              E-mail
            </p>
            <input type="email" {...register("email")} required />
          </div>

          {props.formType === "add" ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                <span className="text-red-600 mr-1">*</span>
                Default Password
              </p>
              <input type="text" defaultValue={password} {...register("password")} onChange={(e) => setPassword(e.target.value)} required />
              <button className="text-sm text-left text-blue-700 underline" type="button" onClick={handleCreatePassword}>
                Generate new password
              </button>
              {password.length ? <PasswordStrengthBar password={password} onChangeScore={handleSetPasswordStrength} /> : null}
            </div>
          ) : null}

          <div className="flex flex-row justify-end gap-3">
            <Button color="success" type="submit" disabled={loading || passwordStrength < 3}>
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
