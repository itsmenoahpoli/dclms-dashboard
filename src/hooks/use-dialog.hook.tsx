import React from "react";
import { ConfirmDialog } from "@/components/shared";
import type { ConfirmDialogProps } from "@/components/shared/ConfirmDialog";

export const useDialog = () => {
  const [dialogProps, setDialogProps] = React.useState<ConfirmDialogProps | null>(null);

  const showConfirm = (props: ConfirmDialogProps) => {
    setDialogProps(props);
  };

  const closeConfirm = () => {
    setDialogProps(null);
  };

  const DialogComponent = dialogProps ? <ConfirmDialog {...dialogProps} onCancel={closeConfirm} /> : null;

  return {
    showConfirm,
    closeConfirm,
    DialogComponent,
  };
};
