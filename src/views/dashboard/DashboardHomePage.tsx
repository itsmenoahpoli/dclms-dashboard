import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "flowbite-react";
import { FcDocument, FcRefresh, FcFolder, FcSurvey } from "react-icons/fc";
import { PageHeader } from "@/components/shared";
import { StatisticsService } from "@/services";
import { roleUtils } from "@/utils";
import { USER_ROLES } from "@/constants";

const ICON_SIZE = 64;

const DashboardHomePage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data?-dashboard-statistics"],
    queryFn: async () => await StatisticsService.getDataStatistics(),
  });

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Dashboard Overview" subtitle="Overall statistics data of dashboard content" />

      {isLoading && data ? (
        "Fetching statistics data"
      ) : (
        <div className="flex flex-row max-md:flex-col gap-5 px-5">
          <Card className="w-full shadow-none">
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <h1 className="text-md font-medium text-gray-black">DOCUMENTS</h1>
                <h1 className="text-3xl text-black mt-4">{data?.totalDocumentsCount}</h1>
              </div>
              <div className="w-full flex justify-end">
                <FcDocument size={ICON_SIZE} />
              </div>
            </div>
          </Card>
          {roleUtils.checkRole(USER_ROLES.ORIGINATOR) ? (
            <Card className="w-full shadow-none">
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <h1 className="text-md font-medium text-gray-black">TO REVISE</h1>
                  <h1 className="text-3xl text-black mt-4">{data?.totalPendingDocumentsCount}</h1>
                </div>
                <div className="w-full flex justify-end">
                  <FcRefresh size={ICON_SIZE} />
                </div>
              </div>
            </Card>
          ) : null}
          <Card className="w-full shadow-none">
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <h1 className="text-md font-medium text-gray-black">SUBMITTED FORMS</h1>
                <h1 className="text-3xl text-black mt-4">{data?.totalFormsSubmittedCount}</h1>
              </div>
              <div className="w-full flex justify-end">
                <FcFolder size={ICON_SIZE} />
              </div>
            </div>
          </Card>
          {roleUtils.checkRole(USER_ROLES.DC) || roleUtils.checkRole(USER_ROLES.QMR) ? (
            <Card className="w-full shadow-none">
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <h1 className="text-md font-medium text-gray-black">DEPARTMENTS</h1>
                  <h1 className="text-3xl text-black mt-4">{data?.totalDepartmentsCount}</h1>
                </div>
                <div className="w-full flex justify-end">
                  <FcSurvey size={ICON_SIZE} />
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DashboardHomePage;
