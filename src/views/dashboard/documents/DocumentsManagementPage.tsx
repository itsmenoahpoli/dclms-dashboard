import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "flowbite-react";
import { useAuthStore } from "@/stores";
import { roleUtils } from "@/utils";
import { USER_ROLES } from "@/constants";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { DocumentFormModal, DocumentInformationModal } from "@/components/domains/documents";
import { DocumentsService } from "@/services";
import { type FormModal } from "@/types/shared";

type DocumentInformationModal = {
  show: boolean;
  selectedDataId?: number;
};

const DocumentsManagementPage: React.FC = () => {
  const { user } = useAuthStore();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["data-documents"],
    queryFn: async () => {
      if (roleUtils.checkRole(USER_ROLES.SUPERADMIN) || roleUtils.checkRole(USER_ROLES.DC) || roleUtils.checkRole(USER_ROLES.QMR)) {
        return await DocumentsService.getDocumentsList();
      }

      if (roleUtils.checkRole(USER_ROLES.ORIGINATOR)) {
        return await DocumentsService.getDocumentsByDepartmentList(user!.departmentId);
      }
    },
  });

  const [formModal, setFormModal] = React.useState<FormModal>({
    show: false,
    selectedData: undefined,
  });

  const [informationModal, setInformationModal] = React.useState<DocumentInformationModal>({ show: false, selectedDataId: undefined });

  const handleFormModal = (data: FormModal) => {
    setFormModal(data);
  };

  const handleViewDocument = (id: number) => {
    setInformationModal({ show: true, selectedDataId: id });
  };

  const handleCloseViewDocument = () => {
    setInformationModal({ show: false, selectedDataId: undefined });
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
      selector: (row: any) => {
        return <Badge color="blue">{row.seriesNumber}</Badge>;
      },
    },
    {
      name: "Department",
      key: "department",
      selector: (row: any) => row.department?.name,
    },
    {
      name: "Originator",
      key: "originator",
      selector: (row: any) => row.originator?.name,
    },
    {
      name: "Status",
      key: "status",
      selector: (row: any) => {
        return <Badge color="yellow">{row.status.toUpperCase()}</Badge>;
      },
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
            <button className="font-medium" onClick={() => handleViewDocument(row.id)}>
              View Document
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

      <DocumentInformationModal show={informationModal.show} dataId={informationModal.selectedDataId} handleClose={handleCloseViewDocument} />

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
        {isLoading ? <LoadingIndicator /> : <DataTable columns={tableColumns} data={data} persistTableHead pagination />}
      </div>
    </div>
  );
};

export default DocumentsManagementPage;
