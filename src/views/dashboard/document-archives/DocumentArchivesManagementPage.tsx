import React from "react";
import DataTable from "react-data-table-component";
import { PageHeader } from "@/components/shared";

const DocumentArchivesManagementPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Document Archives Management"
        subtitle="View and manage documents that are in archives"
        breadcrumbs={["Documents Archives"]}
      />

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">
        <DataTable columns={[]} data={[]} />
      </div>
    </div>
  );
};

export default DocumentArchivesManagementPage;
