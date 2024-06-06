import React from "react";
import DataTable from "react-data-table-component";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "flowbite-react";
import { FiEye } from "react-icons/fi";
import { useAuthStore } from "@/stores";
import { IS_ORIGINATOR, IS_DC, IS_QMR, IS_SUPERADMIN } from "@/constants";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { DocumentFormModal, DocumentInformationModal } from "@/components/domains/documents";
import { DocumentsService } from "@/services";
import { datesUtils } from "@/utils";
import { type FormModal } from "@/types/shared";

type DocumentInformationModal = {
  show: boolean;
  selectedDataId?: number;
};

const DocumentsManagementPage: React.FC = () => {
  // const navigate = useNavigate();
  const { user } = useAuthStore();

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["data-documents"],
    queryFn: async () => {
      if (IS_SUPERADMIN || IS_DC || IS_QMR) {
        return await DocumentsService.getDocumentsListByStatus(searchParams.get("status"));
      }

      if (IS_ORIGINATOR) {
        return await DocumentsService.getDocumentsByDepartmentList(user!.departmentId);
      }
    },
  });

  const [searchParams] = useSearchParams();

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
    // navigate(`/dashboard/documents/${id}/manage`);
  };

  const handleCloseViewDocument = () => {
    setInformationModal({ show: false, selectedDataId: undefined });
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";

      case "approved":
        return "green";

      case "declined":
      case "archived":
        return "red";

      default:
        return "blue";
    }
  };

  React.useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const tableColumns = [
    {
      name: "Document Name",
      key: "name",
      sortable: true,
      selector: (row: any) => row.name,
    },
    {
      name: "Source Document",
      key: "sourceDocument",
      sortable: true,
      selector: (row: any) => row.sourceDocument,
    },
    {
      name: "Series Number",
      key: "seriesNumber",
      sortable: true,
      selector: (row: any) => {
        return <Badge color="blue">{row.seriesNumber}</Badge>;
      },
    },
    {
      name: "Department",
      key: "department",
      sortable: true,
      selector: (row: any) => row.department?.name,
    },
    {
      name: "Status",
      key: "status",
      sortable: true,
      selector: (row: any) => {
        return <Badge color={getBadgeColor(row.status)}>{row.status.toUpperCase()}</Badge>;
      },
    },
    {
      name: "Date Created",
      key: "createdAt",
      sortable: true,
      selector: (row: any) => datesUtils.formatDate(row.createdAt),
    },
    {
      name: "Last Updated",
      key: "updatedAt",
      sortable: true,
      selector: (row: any) => datesUtils.formatDate(row.updatedAt),
    },
    {
      name: "Actions",
      right: true,
      cell: (row: any) => {
        return (
          <div className="flex flex-row gap-6">
            <button
              className="font-medium flex flex-row gap-1 items-center hover:text-blue-500"
              title="View Details"
              onClick={() => handleViewDocument(row.id)}
            >
              <FiEye size={18} /> View
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
        <div className="flex flex-row gap-3 justify-end">
          {IS_ORIGINATOR ? (
            <button className="h-[35px] max-md:!w-full px-3 rounded bg-primary text-white text-sm" onClick={() => handleFormModal({ show: true })}>
              Create Document
            </button>
          ) : null}
          <button
            className="h-[35px] max-md:!w-full px-3 rounded bg-green-300 border border-green-400 text-gray-950 text-xs"
            onClick={() => refetch()}
          >
            Refresh list
          </button>
        </div>
      </PageHeader>

      <div className="w-1/2 flex flex-row gap-2 p-5">
        <div className="w-full flex flex-col gap-1">
          <p className="text-xs text-gray-500">Search</p>
          <input className="h-[35px]" placeholder="By name, series number, department" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="text-xs text-gray-500">Filter by source document</p>
          <select className="h-[35px]">
            <option value=""></option>
          </select>
        </div>
      </div>

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          <div style={{ zoom: 0.9 }}>
            <DataTable columns={tableColumns} data={data} paginationPerPage={25} persistTableHead pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsManagementPage;
