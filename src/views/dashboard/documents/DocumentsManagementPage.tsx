import React from "react";
import DataTable from "react-data-table-component";
import { PageHeader } from "@/components/shared";

export enum SourceDocument {
  QM = "Quality Management",
  PM = "Procedures Manual",
  FM = "Forms Manual",
  RM = "Records Management Manual",
  DI = "Document Information",
}

const DocumentsManagementPage: React.FC = () => {
  const tableColumns = [
    {
      name: "Document Name",
      key: "name",
      selector: (row: any) => row.id,
    },
    {
      name: "Source Document",
      key: "sourceDocument",
      selector: (row: any) => row.id,
    },
    {
      name: "Series Number",
      key: "seriesNumber",
      selector: (row: any) => row.id,
    },
    {
      name: "Department",
      key: "department",
      selector: (row: any) => row.id,
    },
    {
      name: "Status",
      key: "status",
      selector: (row: any) => row.id,
    },
    {
      name: "Originator",
      key: "originator",
      selector: (row: any) => row.id,
    },
    {
      name: "Effectivity Date",
      key: "effectivityDate",
      selector: (row: any) => row.id,
    },
    {
      name: "Actions",
      right: true,
      cell: (row: any) => {
        console.log(row);
        return (
          <div className="flex flex-row gap-6">
            {/* <button className="font-medium" onClick={() => handleUpdate(row)}>
              Update
            </button>
            <button className="text-red-700 font-medium" onClick={() => handleDelete(row.id)}>
              Remove
            </button> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Documents Management"
        subtitle="View and manage documents submitted by all departments that are pending, for revision, for approval"
        breadcrumbs={["Documents Management"]}
      />

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">
        <DataTable columns={tableColumns} data={[]} />
      </div>
    </div>
  );
};

export default DocumentsManagementPage;
