import React from "react";
import { PageHeader } from "@/components/shared";

const overviewStatistics = [
  {
    label: "Approved Documents",
    name: "approved-documents",
  },
  {
    label: "In-progress Documents",
    name: "inprogress-documents",
  },
  {
    label: "Submitted Documents",
    name: "submitted-documents",
  },
  {
    label: "Archived Documents",
    name: "archived-documents",
  },
  {
    label: "Total Departents",
    name: "total-departments",
  },
];

const DashboardHomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Dashboard Overview" subtitle="Overall statistics data of dashboard content" />

      <div className="px-5">
        <div className="flex flex-row gap-3">
          {overviewStatistics.map((stat) => (
            <div key={stat.name} className="w-full min-h-[100px] bg-white border border-gray-200 rounded-md shadow-md p-5"></div>
          ))}
        </div>

        <div className="w-full min-h-[100px] bg-white border border-gray-200 rounded-md shadow-md p-5 mt-5"></div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
