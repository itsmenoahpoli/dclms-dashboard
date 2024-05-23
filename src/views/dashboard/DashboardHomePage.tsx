import React from "react";
import { PageHeader } from "@/components/shared";

const DashboardHomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Dashboard Overview" subtitle="Overall statistics data of dashboard content" />
    </div>
  );
};

export default DashboardHomePage;
