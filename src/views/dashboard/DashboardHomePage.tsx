import React from "react";
import { PageHeader } from "@/components/shared";


const overviewStatistics = [
  {
    label: 'Approved Documents',
    name: 'approved-documents'
  },
  {
    label: 'In-progress Documents',
    name: 'inprogress-documents'
  },
  {
    label: 'Submitted Documents',
    name: 'submitted-documents'
  },
  {
    label: 'Archived Documents',
    name: 'archived-documents'
  },
  {
    label: 'Total Departents',
    name: 'total-departments'
  },
]

console.log(overviewStatistics)

const DashboardHomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Dashboard Overview" subtitle="Overall statistics data of dashboard content" />
    </div>
  );
};

export default DashboardHomePage;
