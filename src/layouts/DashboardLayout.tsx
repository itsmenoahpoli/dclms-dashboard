import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FiHome, FiFileText, FiArchive, FiUsers } from "react-icons/fi";
import { useAuthStore } from "@/stores";
import { roleUtils } from "@/utils";
import { USER_ROLES } from "@/constants";
import BRAND_LOGO from "@/assets/images/brand-logo.png";
import BRAND_SUBLOGO from "@/assets/images/brand-sublogo.png";

const ICON_SIZE = 20;

export const DashboardLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { IS_AUTHENTICATED, CLEAR_AUTH_DATA, user } = useAuthStore();

  React.useLayoutEffect(() => {
    if (!IS_AUTHENTICATED()) {
      window.location.href = "/auth/login";
    }
  }, [IS_AUTHENTICATED]);

  const getUserRole = () => {
    if (user) {
      // @ts-ignore
      return user.userRole?.name.toUpperCase().replaceAll("-", " ");
    }
  };

  const isSidebarLinkActive = (linkUrl: string) => {
    return linkUrl == pathname;
  };

  const handleLogout = () => {
    CLEAR_AUTH_DATA();
    window.location.href = "/auth/login";
  };

  const links = [
    {
      icon: <FiHome size={ICON_SIZE} />,
      label: "Dashboard",
      url: "/dashboard/",
      show: true,
    },
    {
      icon: <FiFileText size={ICON_SIZE} />,
      label: "Documents",
      url: "/dashboard/documents",
      show: true,
    },
    {
      icon: <FiArchive size={ICON_SIZE} />,
      label: "Archives",
      url: "/dashboard/document-archives",
      show: true,
    },
    {
      icon: <FiUsers size={ICON_SIZE} />,
      label: "Users Management",
      url: "/dashboard/users-management",
      show: roleUtils.checkRole(USER_ROLES.SUPERADMIN),
    },
  ];

  const headerLinks = [
    {
      label: "My Account",
      onClick: () => navigate("/dashboard/my-account"),
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
      <div className="h-screen !min-w-[300px] !w-[300px] bg-primary pt-8 max-lg:hidden">
        <div className="h-[280px] flex flex-col gap-5 justify-center items-center text-center border-b-2 border-red-900 px-3 pb-10">
          <img src={BRAND_LOGO} alt="brand-logo" className="h-auto w-2/4" />
          <h1 className="text-white font-bold">Document Control Log Management System</h1>
        </div>

        <p className="text-xs text-white my-3 mx-5">
          Logged-in as <span className="font-bold">{getUserRole()}</span>
        </p>

        <div className="flex flex-col mt-10">
          {links
            .filter((link) => link.show)
            .map((link) => (
              <Link
                to={link.url}
                key={`sidebar-link-${link.label}`}
                className={`w-full flex flex-row items-center gap-3 text-sm text-gray-300 font-medium rounded py-5 px-5 hover:text-white hover:bg-red-950 ${
                  isSidebarLinkActive(link.url) ? "bg-red-950" : ""
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
        </div>
      </div>
      <div className="h-screen w-full bg-slate-50">
        <div className="w-full h-[60px] flex flex-row justify-between items-center bg-white shadow px-5">
          <div className="flex flex-row gap-2 items-center">
            <div className="hidden max-lg:block">
              <Hamburger size={18} />
            </div>
            <h2 className="font-medium block max-lg:hidden">Holy Angel University</h2>
            <img src={BRAND_SUBLOGO} alt="brand-sublogo" className="h-[50px] w-auto hidden max-lg:block" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-row justify-end items-center gap-5">
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
        </div>

        <div className="py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
