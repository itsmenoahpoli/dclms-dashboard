import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderNav, SidebarNav } from "@/components/layouts";
import { useAuthStore } from "@/stores";

export const DashboardLayout: React.FC = () => {
  const { IS_AUTHENTICATED } = useAuthStore();

  React.useLayoutEffect(() => {
    if (!IS_AUTHENTICATED()) {
      window.location.href = "/auth/login";
    }
  }, [IS_AUTHENTICATED]);

  return (
    <div className="h-screen w-screen flex flex-row">
      <SidebarNav />
      <div className="h-screen w-full bg-slate-50">
        <HeaderNav />

        <div className="py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
