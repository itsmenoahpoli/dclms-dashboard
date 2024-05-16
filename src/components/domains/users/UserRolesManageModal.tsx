import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import { UsersService } from "@/services";

export const UserRolesManageModal: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data-user-roles"],
    queryFn: async () => await UsersService.getUserRolesList(),
  });

  const [show, setShow] = React.useState<boolean>(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const tableColumns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Actions",
      right: true,
      selector: (row: any) => row.name,
      cell: (row: any) => {
        console.log(row);
        return (
          <div className="flex flex-row gap-6">
            <button className="font-medium">Update</button>
            <button className="text-red-700 font-medium">Disable</button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <button className="h-[35px] w-full px-3 rounded bg-white text-black border border-gray-500 text-sm" onClick={handleOpen}>
        Roles
      </button>

      <Modal show={show} onClose={handleClose}>
        <Modal.Header>Account Roles</Modal.Header>
        <Modal.Body>
          <div className="flex justify-end mb-3">
            <button className="h-[35px] px-3 rounded bg-primary text-white text-sm" onClick={handleOpen}>
              Add Role
            </button>
          </div>
          {isLoading ? "Fetching" : <DataTable columns={tableColumns} data={data} persistTableHead />}
        </Modal.Body>
      </Modal>
    </>
  );
};
