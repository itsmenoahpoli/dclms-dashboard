import { mountStoreDevtool } from "simple-zustand-devtools";
import { useAuthStore } from "@/stores/auth.store";

mountStoreDevtool("auth-store", useAuthStore);

export { useAuthStore };
