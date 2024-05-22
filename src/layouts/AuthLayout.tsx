import React from "react";
import { Outlet } from "react-router-dom";
import BRAND_LOGO from "@/assets/images/brand-logo.png";

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout h-screen w-screen bg-slate-100 flex justify-center pt-[5%]">
      <div className="w-[450px] max-sm:!w-[90%] flex flex-col items-center gap-2">
        <div className="w-full bg-white pt-5 border-t-8 border-primary" style={{ zoom: 0.9 }}>
          <div className="flex justify-center mb-5">
            <img src={BRAND_LOGO} alt="brand-logo.png" className="h-auto w-[200px]" />
          </div>

          <h1 className="font-bold text-xl text-center">DOCUMENT CONTROL LOG MANAGEMENT</h1>
          <p className="text-sm text-gray-500 text-center px-8 mt-3">
            The Holy Angel University Office of Institutional Effectiveness plays a pivotal role in ensuring the quality management of HAU operations
            and compliance
          </p>

          <div className="bg-slate-50 border-t-2 border-gray-200 p-8 mt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
