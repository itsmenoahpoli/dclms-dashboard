import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Spinner } from "flowbite-react";
import { AuthService } from "@/services";
import { Credentials } from "@/types/auth";

export const LoginForm: React.FC = () => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFormSubmit = handleSubmit(async (credentials: Credentials) => {
    setLoading(true);

    await AuthService.authenticateCredentials(credentials, setLoading).finally(() => {
      reset();
    });
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <h1 className="font-semibold text-lg mb-2">LOG IN</h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center gap-4 p-10">
          <Spinner color="failure" />
          <p className="text-sm text-gray-500">Authenticating account credentials </p>
        </div>
      ) : (
        <form className="flex flex-col gap-3 text-[14px] mt-2" onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Department Username" {...register("username")} required />

          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" {...register("password")} required />
            <div className="absolute right-4 top-4">
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="h-[50px] w-full  text-white bg-primary  rounded mt-2">
            LOG IN
          </button>

          <Link to="/auth/request-otp" className="text-blue-600 underline text-center">
            Forgot your password?
          </Link>
        </form>
      )}
    </div>
  );
};
