import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { AuthService } from "@/services";

type Props = {
  userDetails: any;
};

export const AccountInformationForm: React.FC<Props> = (props) => {
  const accountInformationForm = useForm({
    defaultValues: {
      name: props.userDetails.name,
      email: props.userDetails.email,
      username: props.userDetails.username,
    },
  });
  const accountPasswordForm = useForm();

  const handleUpdateInformation = accountInformationForm.handleSubmit(async (formData: any) => {
    await AuthService.updateProfile(props.userDetails.id, formData);
  });

  const handleUpdatePassword = accountPasswordForm.handleSubmit(async (formData: any) => {
    const { new_password, confirm_new_password } = formData;

    if (new_password !== confirm_new_password) {
      toast.warning("Passwords must match");

      return;
    }

    delete formData.confirm_new_password;
    await AuthService.updatePassword(props.userDetails.id, formData).then(() => accountPasswordForm.reset());
  });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-bold">ACCOUNT INFORMATION</p>
        <hr className="my-3" />
        <form className="flex flex-col gap-3 text-sm" onSubmit={handleUpdateInformation}>
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">Full Name</p>
            <input type="text" {...accountInformationForm.register("name")} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">Email</p>
            <input type="text" {...accountInformationForm.register("email")} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">Username</p>
            <input type="text" {...accountInformationForm.register("username")} />
          </div>
          {props.userDetails.department ? (
            <div className="flex flex-col gap-1">
              <p className="text-gray-800">Department</p>
              <input type="text" className="bg-gray-200" defaultValue={props.userDetails.department.name} readOnly />
            </div>
          ) : null}

          <Button color="success" size="xs" type="submit" className="w-[100px] text-xs">
            Update
          </Button>
        </form>
      </div>
      <hr />
      <div>
        <p className="text-xs font-bold">ACCOUNT SECURITY</p>
        <hr className="my-3" />
        <form className="flex flex-col gap-3 text-sm" onSubmit={handleUpdatePassword}>
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">Old Password</p>
            <input type="text" {...accountPasswordForm.register("old_password")} required />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">New Password</p>
            <input type="text" {...accountPasswordForm.register("new_password")} required />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">Confirm New Password</p>
            <input type="text" {...accountPasswordForm.register("confirm_new_password")} required />
          </div>

          <Button color="success" size="xs" type="submit" className="w-[100px] text-xs">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
