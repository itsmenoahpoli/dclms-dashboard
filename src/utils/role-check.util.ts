import { useAuthStore } from "@/stores";

export const roleUtils = {
  checkRole: (role: string | string[], checkMultipleRole: boolean = false) => {
    const { user } = useAuthStore.getState();

    if (!user) return false;

    if (checkMultipleRole) {
      //
    }

    // @ts-ignore
    return user?.userRole.name === role.toLowerCase();
  },
};
