import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "flowbite-react";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { DepartmentsService } from "@/services";
// import { useDialog } from "@/hooks";
// import type { FormModal } from "@/types/shared";

export const DepartmentsManagementPage: React.FC = () => {
  // const { showConfirm, closeConfirm, DialogComponent } = useDialog();

  const { data, isFetching } = useQuery({
    queryKey: ["data-users-list"],
    queryFn: async () => await DepartmentsService.getDepartmentsList(),
  });

  const handleUpdate = (data: any) => {
    console.log(data);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const tableColumns = [
    {
      name: "Full Name",
      sortable: true,
      selector: (row: any) => row.name,
    },
    {
      name: "E-mail",
      sortable: true,
      selector: (row: any) => row.email,
    },
    {
      name: "Username",
      width: "300px",
      sortable: true,
      selector: (row: any) => row.username,
    },
    {
      name: "Department",
      sortable: true,
      selector: (row: any) => row.department?.name || <Badge color="red">Unassigned</Badge>,
    },
    {
      name: "Last login",
      sortable: true,
      selector: (row: any) => row.lastSignin || "--",
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
            <button className="text-red-700 font-medium" onClick={() => handleDelete(row.id)}>
              Remove
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {/* {DialogComponent} */}

      <PageHeader
        title="Users Management"
        subtitle="View and manage user accounts and user roles for all departments"
        breadcrumbs={["Users Management"]}
      >
        <div className="flex flex-row max-md:flex-col justify-end gap-3 w-full">
          <button className="h-[35px] max-md:!w-full px-3 rounded bg-primary text-white text-sm">Add Department</button>
        </div>
      </PageHeader>

      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <div style={{ zoom: 0.9 }}>
          <DataTable columns={tableColumns} data={data} persistTableHead pagination />
        </div>
      )}
    </div>
  );
};
