import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Modal, Button } from "flowbite-react";
import { UsersService } from "@/services";

export const UserRolesManageModal: React.FC = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["data-user-roles"],
    queryFn: async () => await UsersService.getUserRolesList(),
  });

  const { handleSubmit, register, reset, setValue } = useForm();

  const [show, setShow] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{ selectedData?: any }>({
    selectedData: undefined,
  });

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleForm = (formData: any) => {
    if (formData) {
      setValue("name", formData.name);
    }

    setForm({ selectedData: formData });
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleResetForm = () => {
    handleForm(undefined);
    reset();
  };

  const handleSubmitForm = handleSubmit(async (formData: any) => {
    if (!form.selectedData) {
      await UsersService.createUserRole(formData);
    } else {
      await UsersService.updateUserRole(form.selectedData!.id, formData);
    }

    refetch();
  });

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
        return (
          <div className="flex flex-row gap-6">
            <button className="font-medium" onClick={() => handleForm(row)}>
              Update
            </button>
            {row.users.length === 0 ? (
              <button className="text-red-700 font-medium" onClick={() => handleDelete(row.id)}>
                Disable
              </button>
            ) : null}
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
          <div className="bg-slate-50 rounded border border-gray-300 p-3 my-3">
            <form onSubmit={handleSubmitForm}>
              <p className="font-medium">Role Details Form</p>
              <hr className="my-2" />
              <div className="flex flex-col gap-2 my-3">
                <input type="text" className="h-[40px]" placeholder="Enter role name" {...register("name")} required />
                <div className="flex flex-row gap-2">
                  <Button type="submit" color="success" className="h-[40px] w-[80px]">
                    {form.selectedData ? "Update" : "Add"}
                  </Button>
                  <Button color="light" className="h-[40px] w-[80px]" onClick={handleResetForm}>
                    Clear
                  </Button>
                </div>
              </div>
            </form>
          </div>
          {isFetching ? "Fetching" : <DataTable columns={tableColumns} data={data} persistTableHead />}
        </Modal.Body>
      </Modal>
    </>
  );
};
