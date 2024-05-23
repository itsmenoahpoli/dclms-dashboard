import { roleUtils } from "@/utils";

export const USER_ROLES = {
  SUPERADMIN: "superadmin",
  ORIGINATOR: "originator-per-document",
  DC: "document-controller",
  QMR: "quality-management-representative",
};

// prettier-ignore
export const IS_NOT_ORIGINATOR = roleUtils.checkRole(USER_ROLES.DC) || roleUtils.checkRole(USER_ROLES.QMR) || roleUtils.checkRole(USER_ROLES.SUPERADMIN);

export const IS_SUPERADMIN = roleUtils.checkRole(USER_ROLES.SUPERADMIN);

export const IS_DC = roleUtils.checkRole(USER_ROLES.DC);

export const IS_QMR = roleUtils.checkRole(USER_ROLES.QMR);

export const IS_ORIGINATOR = roleUtils.checkRole(USER_ROLES.ORIGINATOR);
