import React from "react";
import { AuthLayout } from "@/layouts";
import { LoginForm } from "@/components/domains";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
