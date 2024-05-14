import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

type AuthData = { authToken: string; user: User };

export type AuthStore = {
  authToken?: string;
  user?: User;
  SET_AUTH_DATA: (data: AuthData) => void;
  GET_AUTH_DATA: () => AuthData;
  CLEAR_AUTH_DATA: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      authToken: undefined,
      user: undefined,
      SET_AUTH_DATA: (data: AuthData) => {
        return set({
          authToken: data.authToken,
          user: data.user,
        });
      },
      GET_AUTH_DATA: () => {
        return {
          authToken: get().authToken!,
          user: get().user!,
        };
      },
      CLEAR_AUTH_DATA: () => {
        return set({
          authToken: undefined,
          user: undefined,
        });
      },
    }),
    {
      name: "auth-store",
    }
  )
);
