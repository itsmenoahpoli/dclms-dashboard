import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FiHome, FiFileText, FiArchive, FiUsers } from "react-icons/fi";
import { useAuthStore } from "@/stores";
import BRAND_LOGO from "@/assets/images/brand-logo.png";

export const DashboardLayout: React.FC = () => {
  const { IS_AUTHENTICATED, CLEAR_AUTH_DATA } = useAuthStore();

  React.useLayoutEffect(() => {
    if (!IS_AUTHENTICATED()) {
      window.location.href = "/auth/login";
    }
  }, [IS_AUTHENTICATED]);

  const handleLogout = () => {
    CLEAR_AUTH_DATA();
    window.location.href = "/auth/login";
  };

  const links = [
    {
      icon: <FiHome size={24} />,
      label: "Dashboard",
      url: "/dashboard/",
    },
    {
      icon: <FiFileText size={24} />,
      label: "Documents",
      url: "/dashboard/documents",
    },
    {
      icon: <FiArchive size={24} />,
      label: "Archives",
      url: "/dashboard/document-archives",
    },
    {
      icon: <FiUsers size={24} />,
      label: "Users Management",
      url: "/dashboard/users-management",
    },
  ];

  const headerLinks = [
    {
      label: "My Account",
      onClick: () => console.log("my account"),
    },
    {
      label: "Log Out",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="h-screen w-[350px] bg-primary pt-8 max-md:hidden">
        <div className="h-[280px] flex flex-col gap-5 justify-center items-center text-center border-b-2 border-red-900 px-3 pb-10">
          <img src={BRAND_LOGO} alt="brand-logo" className="h-auto w-2/4" />
          <h1 className="text-white font-bold">Document Control Log Management System</h1>
        </div>

        <div className="flex flex-col gap-8 px-8 mt-10">
          {links.map((link) => (
            <Link
              to={link.url}
              key={`sidebar-link-${link.label}`}
              className="w-full flex flex-row items-center gap-3 text-sm text-gray-300 font-medium hover:text-white"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="h-screen w-full bg-slate-50">
        <div className="w-full h-[60px] flex flex-row justify-between items-center bg-white shadow px-5">
          <div>
            <h2>Holy Angel University</h2>
          </div>
          <div className="flex flex-row justify-end items-center gap-6">
            {headerLinks.map((link, idx) => (
              <button
                onClick={link.onClick}
                key={`header-link-${link.label}`}
                className={`text-sm hover:underline ${idx === 1 ? "text-red-500" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
