import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "flowbite-react";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { UserAccountFormModal } from "@/components/domains/users";
import { UsersService } from "@/services";
import { useDialog } from "@/hooks";
import type { FormModal } from "@/types/shared";

const UsersManagementPage: React.FC = () => {
  const { showConfirm, closeConfirm, DialogComponent } = useDialog();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data-users-list"],
    queryFn: async () => await UsersService.getUsersList(),
  });

  const [formModal, setFormModal] = React.useState<FormModal>({
    show: false,
    selectedData: undefined,
  });

  const handleFormModal = (data: FormModal) => {
    setFormModal(data);
  };

  const handleUpdate = (userData: any) => {
    handleFormModal({
      show: true,
      selectedData: userData,
    });
  };

  const handleDelete = (id: number) => {
    showConfirm({
      open: true,
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this record?",
      onConfirm: async () => {
        await UsersService.deleteUser(id);
        refetch();
        closeConfirm();
      },
      onCancel: () => {
        console.log("hide");
      },
    });
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
      {DialogComponent}

      <UserAccountFormModal
        show={formModal.show}
        formType={formModal.selectedData ? "update" : "add"}
        data={formModal.selectedData}
        refetch={refetch}
        handleClose={() => handleFormModal({ show: false, selectedData: undefined })}
      />

      <PageHeader
        title="Users Management"
        subtitle="View and manage user accounts and user roles for all departments"
        breadcrumbs={["Users Management"]}
      >
        <div className="flex flex-row max-md:flex-col justify-end gap-3 w-full">
          <button className="h-[35px] max-md:!w-full px-3 rounded bg-primary text-white text-sm" onClick={() => handleFormModal({ show: true })}>
            Add User
          </button>
        </div>
      </PageHeader>

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">
        {isLoading ? <LoadingIndicator /> : <DataTable columns={tableColumns} data={data} persistTableHead pagination />}
      </div>
    </div>
  );
};

export default UsersManagementPage;
