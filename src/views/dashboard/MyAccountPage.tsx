import React from "react";
import { Card } from "flowbite-react";
import { PageHeader } from "@/components/shared";
import { AccountInformationForm } from "@/components/domains/account";
import { useAuthStore } from "@/stores";

const DashboardHomePage: React.FC = () => {
  const { user } = useAuthStore();

  console.log(user);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="My Account" subtitle="Update and manage your account information" breadcrumbs={["My Account"]} />

      <div className="px-5">
        <Card className="w-1/2 max-lg:w-full">
          <AccountInformationForm userDetails={user} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardHomePage;
