import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogin = async (credentials: Credentials) => {
    setLoading(true);

    await AuthService.authenticateCredentials(credentials, setLoading).finally(() => {
      reset();
    });
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
        <form className="flex flex-col gap-3 text-[14px] mt-2" onSubmit={handleSubmit((data) => handleLogin(data as Credentials))}>
          <input type="text" placeholder="Department Username" {...register("username")} required />
          <input type="password" placeholder="Password" {...register("password")} required />
          <button type="submit" className="h-[50px] w-full  text-white bg-primary  rounded mt-2">
            LOG IN
          </button>

          <Link to="/" className="text-blue-600 underline text-center">
            Forgot your password?
          </Link>
        </form>
      )}
    </div>
  );
};
