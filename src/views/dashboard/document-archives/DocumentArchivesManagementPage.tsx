import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "flowbite-react";
import { FiEye } from "react-icons/fi";
import { useAuthStore } from "@/stores";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { DocumentInformationModal } from "@/components/domains/documents";
import { DocumentsService } from "@/services";
import { IS_SUPERADMIN, IS_DC, IS_QMR, IS_ORIGINATOR } from "@/constants";
import { datesUtils } from "@/utils";

type DocumentInformationModal = {
  show: boolean;
  selectedDataId?: number;
};

const DocumentArchivesManagementPage: React.FC = () => {
  const { user } = useAuthStore();

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["data-documents"],
    queryFn: async () => {
      if (IS_SUPERADMIN || IS_DC || IS_QMR) {
        return await DocumentsService.getArchivedDocumentsList();
      }

      if (IS_ORIGINATOR) {
        return await DocumentsService.getArchivedDocumentsByDepartmentList(user!.departmentId);
      }
    },
  });

  const [informationModal, setInformationModal] = React.useState<DocumentInformationModal>({ show: false, selectedDataId: undefined });

  const handleViewDocument = (id: number) => {
    setInformationModal({ show: true, selectedDataId: id });
  };

  const handleCloseViewDocument = () => {
    setInformationModal({ show: false, selectedDataId: undefined });
  };

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
              className="font-medium flex flex-row gap-2 items-center hover:text-blue-500"
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
      <DocumentInformationModal
        refetch={refetch}
        show={informationModal.show}
        dataId={informationModal.selectedDataId}
        handleClose={handleCloseViewDocument}
      />

      <PageHeader title="Document Archives Management" subtitle="View and manage documents that are in archives" breadcrumbs={["Documents Archives"]}>
        <div className="flex justify-end">
          <button className="h-[35px] max-md:!w-full px-3 rounded bg-gray-200 border border-gray-300 text-gray-800 text-sm" onClick={() => refetch()}>
            Refresh list
          </button>
        </div>
      </PageHeader>

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">
        {isFetching ? <LoadingIndicator /> : <DataTable columns={tableColumns} data={data} />}
      </div>
    </div>
  );
};

export default DocumentArchivesManagementPage;
