import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFileText, FiArchive, FiUsers, FiLayers } from "react-icons/fi";
import { IS_SUPERADMIN } from "@/constants";

type Props = {
  onLinkClick?: () => void;
};

const ICON_SIZE = 20;

export const SidebarNavItems: React.FC<Props> = (props) => {
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
      label: "Documents (Pending)",
      url: "/dashboard/documents?status=pending",
      show: true,
    },
    // {
    //   icon: <FiFileText size={ICON_SIZE} />,
    //   label: "Documents (In-Progress)",
    //   url: "/dashboard/documents?status=in-progress",
    //   show: true,
    // },
    // {
    //   icon: <FiFileText size={ICON_SIZE} />,
    //   label: "Documents (Completed)",
    //   url: "/dashboard/documents?status=approved",
    //   show: true,
    // },
    {
      icon: <FiArchive size={ICON_SIZE} />,
      label: "Documents (Archived)",
      url: "/dashboard/document-archives",
      show: true,
    },
    {
      icon: <FiUsers size={ICON_SIZE} />,
      label: "Users Management",
      url: "/dashboard/users-management",
      show: IS_SUPERADMIN,
    },
    {
      icon: <FiLayers size={ICON_SIZE} />,
      label: "Departments Management",
      url: "/dashboard/departments-management",
      show: IS_SUPERADMIN,
    },
  ];

  const isSidebarLinkActive = (linkUrl: string) => {
    return linkUrl == pathname;
  };

  return (
    <div className="flex flex-col">
      {links
        .filter((link) => link.show)
        .map((link) => (
          <Link
            onClick={props.onLinkClick}
            to={link.url}
            key={`sidebar-link-${link.label}`}
            className={`w-full flex flex-row items-center gap-3 text-xs text-gray-300 font-medium rounded py-5 px-5 hover:text-white hover:bg-red-950 ${
              isSidebarLinkActive(link.url) ? "bg-red-950" : ""
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
    </div>
  );
};
