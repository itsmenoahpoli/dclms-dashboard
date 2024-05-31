import React from "react";
import { useAuthStore } from "@/stores";
import { SidebarNavItems } from "@/components/layouts/SidebarNavItems";
import BRAND_LOGO from "@/assets/images/brand-logo.png";

type Props = {
  onLinkClick?: () => void;
};

export const SidebarNav: React.FC<Props> = (props) => {
  const { user } = useAuthStore();

  const getUserRole = () => {
    if (user) {
      // @ts-ignore
      return user.userRole?.name.toUpperCase().replaceAll("-", " ");
    }
  };

  return (
    <div className="h-screen !min-w-[300px] !w-[300px] bg-primary pt-8 max-lg:hidden">
      <div className="h-[280px] flex flex-col gap-5 justify-center items-center text-center border-b-2 border-red-900 px-3 pb-10 mb-5">
        <img src={BRAND_LOGO} alt="brand-logo" className="h-auto w-2/4" />
        <h1 className="text-white font-bold">Document Control Log Management System</h1>
      </div>

      <div className="w-full bg-[#871223] flex flex-col gap-2 rounded p-5">
        <div className="flex flex-row items-center gap-4">
          <div className="w-[50px] h-[50px] bg-red-800 rounded-lg"></div>
          <span>
            <p className="text-sm text-white">{user?.name}</p>
            <small className="text-xs text-gray-300">{getUserRole()}</small>
          </span>
        </div>
      </div>

      <SidebarNavItems onLinkClick={props.onLinkClick} />
    </div>
  );
};
