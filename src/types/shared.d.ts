export type FormModal = { show: boolean; selectedData?: any };

export enum UserRoles {
  SUPERADMIN = "superadmin",
  ORIGINATOR = "originator-per-document",
  DC = "document-controller",
  QMC = "quality-management-representative",
}
