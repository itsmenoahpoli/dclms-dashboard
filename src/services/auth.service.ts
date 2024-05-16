import { AxiosError } from "axios";
import { toast } from "react-toastify";
import http from "@/api";
import { useAuthStore } from "@/stores";
import type { Credentials } from "@/types/auth";

export const AuthService = {
  authenticateCredentials: async function (credentials: Credentials, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return await http
      .post("/auth/login", credentials)
      .then((response) => {
        const { SET_AUTH_DATA } = useAuthStore.getState();
        const { accessToken, user } = response.data;

        if (response.data.message === "INVALID_ACCOUNT") {
          setLoading(false);
          return toast.error("Login failed, invalid credentials provided");
        }

        SET_AUTH_DATA({ authToken: accessToken, user });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 5000);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            toast.error("Login failed, invalid credentials provided");
          }
        }

        setLoading(false);
      });
  },

  logout: function () {
    const { CLEAR_AUTH_DATA } = useAuthStore.getState();

    CLEAR_AUTH_DATA();

    window.location.href = "/auth/login";
  },
};
