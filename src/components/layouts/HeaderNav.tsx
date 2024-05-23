import React from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";
import { SidebarNavItems } from "@/components/layouts";
import { useAuthStore } from "@/stores";
import BRAND_SUBLOGO from "@/assets/images/brand-sublogo.png";

export const HeaderNav: React.FC = () => {
  const navigate = useNavigate();
  const { CLEAR_AUTH_DATA } = useAuthStore();

  const [showNav, setShowNav] = React.useState<boolean>(false);

  const handleLogout = () => {
    CLEAR_AUTH_DATA();
    window.location.href = "/auth/login";
  };

  const handleToggleNav = () => {
    setShowNav((prevState) => !prevState);
  };

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
    <>
      <div className="w-full h-[60px] flex flex-row justify-between items-center bg-white shadow px-5">
        <div className="flex flex-row gap-2 items-center">
          <div className="hidden max-lg:block">
            <Hamburger size={18} onToggle={handleToggleNav} />
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

      {showNav ? (
        <div className="w-screen bg-primary text-white fixed bottom-0 pt-[80px]" style={{ height: "calc(100vh - 60px)", zIndex: 9999 }}>
          <SidebarNavItems />
        </div>
      ) : null}
    </>
  );
};
