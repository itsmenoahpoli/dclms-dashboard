import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { DepartmentsService } from "@/services";
import { datesUtils } from "@/utils";
// import { useDialog } from "@/hooks";
// import type { FormModal } from "@/types/shared";

const DepartmentsManagementPage: React.FC = () => {
  // const { showConfirm, closeConfirm, DialogComponent } = useDialog();

  const { data, isFetching } = useQuery({
    queryKey: ["data-users-list"],
    queryFn: async () => await DepartmentsService.getDepartmentsList(),
  });

  const handleUpdate = (data: any) => {
    console.log(data);
  };

  const handleDelete = async (id: number) => {
    await DepartmentsService.deleteDepartment(id);
  };

  const tableColumns = [
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row.name,
    },
    {
      name: "Acronym",
      sortable: true,
      selector: (row: any) => row.title,
    },
    {
      name: "Series Number Prefix",
      sortable: true,
      selector: (row: any) => row.seriesPrefix,
    },
    {
      name: "Date Created",
      sortable: true,
      selector: (row: any) => datesUtils.formatDate(row.createdAt),
    },
    {
      name: "Last Updated",
      sortable: true,
      selector: (row: any) => (row.createdAt === row.updatedAt ? "--" : datesUtils.formatDate(row.createdAt)),
    },
    {
      name: "Actions",
      right: true,
      cell: (row: any) => {
        return (
          <div className="flex flex-row gap-6">
            <button className="font-medium" onClick={() => handleUpdate(row)}>
              Update
            </button>

            {row.users.length || row.documents.length ? (
              <div className="w-[50px] text-center">--</div>
            ) : (
              <button className="text-red-700 font-medium" onClick={() => handleDelete(row.id)}>
                Remove
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {/* {DialogComponent} */}

      <PageHeader
        title="Departments Management"
        subtitle="View and manage departments and departments information"
        breadcrumbs={["Departments Management"]}
      >
        <div className="flex flex-row max-md:flex-col justify-end gap-3 w-full">
          <button className="h-[35px] max-md:!w-full px-3 rounded bg-primary text-white text-sm">Add Department</button>
        </div>
      </PageHeader>

      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <div style={{ zoom: 0.9 }}>
          <p className="text-sm text-gray-700 text-right mx-5 my-3">
            If <span className="text-red-700 font-bold">Remove</span> is hidden, means a user and/or document is assigned to the specific department
            record
          </p>
          <DataTable columns={tableColumns} data={data} persistTableHead pagination />
        </div>
      )}
    </div>
  );
};

export default DepartmentsManagementPage;
