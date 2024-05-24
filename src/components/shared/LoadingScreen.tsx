import React from "react";
import BRAND_LOGO from "@/assets/images/brand-logo.png";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img src={BRAND_LOGO} alt="brand-logo" className="h-auto w-[150px]" />
    </div>
  );
};
