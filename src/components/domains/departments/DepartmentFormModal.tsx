import React from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Spinner } from "flowbite-react";
import { DepartmentsService } from "@/services";

type Props = {
  show: boolean;
  formType: "add" | "update";
  data?: any;
  refetch: () => void;
  handleClose: () => void;
};

export const DepartmentFormModal: React.FC<Props> = (props) => {
  const { handleSubmit, register, reset } = useForm();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmitForm = handleSubmit(async (formData: any) => {
    setLoading(true);

    if (props.formType === "add") {
      await DepartmentsService.createDepartment(formData, setLoading);
    }

    props.handleClose();
    props.refetch();
  });

  const handleCloseModal = () => {
    reset();
    props.handleClose();
  };

  return (
    <Modal show={props.show} onClose={handleCloseModal}>
      <Modal.Header>Department Details</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-5" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Name
            </p>
            <input type="text" {...register("name")} required />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Acronym
            </p>
            <input type="text" {...register("title")} required />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="text-red-600 mr-1">*</span>
              Series Number Prefix
            </p>
            <input type="number" {...register("seriesPrefix")} required />
          </div>

          <div className="flex flex-row justify-end gap-3">
            <Button color="success" type="submit" disabled={loading}>
              {loading ? <Spinner /> : props.formType === "add" ? "Create Account" : "Update Account"}
            </Button>
            <Button color="light" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
