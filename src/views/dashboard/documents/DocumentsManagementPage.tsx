import React from "react";
import { PageHeader } from "@/components/shared";

const DocumentsManagementPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Documents Management"
        subtitle="View and manage documents submitted by all departments that are pending, for revision, for approval"
        breadcrumbs={["Documents Management"]}
      />
    </div>
  );
};

export default DocumentsManagementPage;
