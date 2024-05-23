import React from "react";
import { useAuthStore } from "@/stores";
import { SidebarNavItems } from "@/components/layouts/SidebarNavItems";

import BRAND_LOGO from "@/assets/images/brand-logo.png";

export const SidebarNav: React.FC = () => {
  const { user } = useAuthStore();

  const getUserRole = () => {
    if (user) {
      // @ts-ignore
      return user.userRole?.name.toUpperCase().replaceAll("-", " ");
    }
  };

  return (
    <div className="h-screen !min-w-[300px] !w-[300px] bg-primary pt-8 max-lg:hidden">
      <div className="h-[280px] flex flex-col gap-5 justify-center items-center text-center border-b-2 border-red-900 px-3 pb-10">
        <img src={BRAND_LOGO} alt="brand-logo" className="h-auto w-2/4" />
        <h1 className="text-white font-bold">Document Control Log Management System</h1>
      </div>

      <p className="text-xs text-white my-3 mx-5">
        Logged-in as <span className="font-bold">{getUserRole()}</span>
      </p>

      <SidebarNavItems />
    </div>
  );
};
