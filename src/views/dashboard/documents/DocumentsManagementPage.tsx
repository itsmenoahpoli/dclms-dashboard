import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "flowbite-react";
import { roleUtils } from "@/utils";
import { PageHeader } from "@/components/shared";
import { DocumentFormModal } from "@/components/domains/documents";
import { DocumentsService } from "@/services";
import type { FormModal } from "@/types/shared";

const DocumentsManagementPage: React.FC = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["data-documents"],
    queryFn: async () => await DocumentsService.getDocumentsList(),
  });

  const [formModal, setFormModal] = React.useState<FormModal>({
    show: false,
    selectedData: undefined,
  });

  const handleFormModal = (data: FormModal) => {
    setFormModal(data);
  };

  const handleViewNotices = (documentData: any) => {
    console.log(documentData);
  };

  const handleArchive = (id: number) => {
    console.log(id);
  };

  const tableColumns = [
    {
      name: "Document Name",
      key: "name",
      selector: (row: any) => row.name,
    },
    {
      name: "Source Document",
      key: "sourceDocument",
      selector: (row: any) => row.sourceDocument,
    },
    {
      name: "Series Number",
      key: "seriesNumber",
      selector: (row: any) => row.seriesNumber,
    },
    {
      name: "Department",
      key: "department",
      selector: (row: any) => row.department?.name,
    },
    {
      name: "Status",
      key: "status",
      selector: (row: any) => {
        return <Badge color="yellow">{row.status.toUpperCase()}</Badge>;
      },
    },
    {
      name: "Originator",
      key: "originator",
      selector: (row: any) => row.originator?.name,
    },
    {
      name: "Effectivity Date",
      key: "effectivityDate",
      selector: (row: any) => row.effectivityDate || "-",
    },
    {
      name: "Actions",
      right: true,
      cell: (row: any) => {
        return (
          <div className="flex flex-row gap-6">
            <button className="font-medium" onClick={() => handleViewNotices(row)}>
              View Requests
            </button>
            <button className="text-red-700 font-medium" onClick={() => handleArchive(row.id)}>
              Archive
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DocumentFormModal
        show={formModal.show}
        formType={formModal.selectedData ? "update" : "add"}
        data={formModal.selectedData}
        refetch={refetch}
        handleClose={() => handleFormModal({ show: false, selectedData: undefined })}
      />

      <PageHeader
        title="Documents Management"
        subtitle="View and manage documents submitted by all departments that are pending, for revision, for approval"
        breadcrumbs={["Documents Management"]}
      >
        {roleUtils.checkRole("originator-per-document") ? (
          <div className="flex justify-end">
            <button className="h-[35px] max-md:!w-full px-3 rounded bg-primary text-white text-sm" onClick={() => handleFormModal({ show: true })}>
              Create Document
            </button>
          </div>
        ) : null}
      </PageHeader>

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">
        {isLoading ? "Fetching" : <DataTable columns={tableColumns} data={data} persistTableHead />}
      </div>
    </div>
  );
};

export default DocumentsManagementPage;
