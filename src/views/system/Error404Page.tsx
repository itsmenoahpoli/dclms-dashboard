import React from "react";
import { Link } from "react-router-dom";
import BRAND_LOGO from "@/assets/images/brand-logo.png";

const Error404Page: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-primary flex flex-col justify-center items-center gap-4">
      <img src={BRAND_LOGO} alt="brand-logo" className="h-auto w-[150px]" />
      <h1 className="text-white text-3xl font-bold">PAGE NOT FOUND</h1>

      <Link to="/dashboard" className="text-sm text-white underline underline-offset-4">
        Go back home
      </Link>
    </div>
  );
};

export default Error404Page;
