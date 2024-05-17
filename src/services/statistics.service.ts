import { toast } from "react-toastify";
import http from "@/api";

export const StatisticsService = {
  getDataStatistics: async function () {
    return await http
      .get("/system/dashboard-stats")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast("Failed to fetch statistics data");
      });
  },
};
