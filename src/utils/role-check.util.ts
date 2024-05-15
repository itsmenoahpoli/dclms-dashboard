import { useAuthStore } from "@/stores";

export const roleUtils = {
  checkRole: (role: string) => {
    const { user } = useAuthStore.getState();

    if (!user) return false;

    // @ts-ignore
    return user?.userRole.name === role.toLowerCase();
  },
};
