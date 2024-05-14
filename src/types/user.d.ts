import { Department } from "@/types/departments";

export type User = {
  id: number;
  name: string;
  email: string;
  lastSignin: string;
  isVerified: boolean;
  userRoleId: null;
  departmentId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  userRole: null;
  department: Department;
};
