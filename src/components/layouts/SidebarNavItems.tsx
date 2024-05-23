import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFileText, FiArchive, FiUsers, FiLayers } from "react-icons/fi";
import { roleUtils } from "@/utils";
import { USER_ROLES } from "@/constants";

const ICON_SIZE = 20;

export const SidebarNavItems: React.FC = () => {
  const { pathname } = useLocation();
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
    {
      icon: <FiLayers size={ICON_SIZE} />,
      label: "Departments Management",
      url: "/dashboard/departments-management",
      show: roleUtils.checkRole(USER_ROLES.SUPERADMIN),
    },
  ];

  const isSidebarLinkActive = (linkUrl: string) => {
    return linkUrl == pathname;
  };

  return (
    <div className="flex flex-col mt-10 max-lg:mt-0">
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
  );
};
