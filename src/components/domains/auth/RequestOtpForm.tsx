import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { AuthService } from "@/services";

export const RequestOtpForm: React.FC = () => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      identifier: "",
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFormSubmit = handleSubmit(async (formData: { identifier: string }) => {
    setLoading(true);

    await AuthService.requestOtp(formData, setLoading).finally(() => {
      reset();
    });
  });

  return (
    <div className="w-full">
      <h1 className="font-semibold text-lg mb-2">VERIFY YOUR ACCOUNT</h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center gap-4 p-10">
          <Spinner color="failure" />
          <p className="text-sm text-gray-500">Checking e-mail provided </p>
        </div>
      ) : (
        <form className="flex flex-col gap-3 text-[14px] mt-2" onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Email or username of your account" {...register("identifier")} required />
          <button type="submit" className="h-[50px] w-full  text-white bg-primary  rounded mt-2">
            SEND OTP
          </button>

          <Link to="/auth/login" className="text-blue-600 underline mt-8">
            Back to login
          </Link>
        </form>
      )}
    </div>
  );
};
