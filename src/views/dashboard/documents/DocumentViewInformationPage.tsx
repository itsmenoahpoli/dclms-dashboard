import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PageHeader, LoadingIndicator } from "@/components/shared";
import { DocumentsService } from "@/services";

const DocumentViewInformationPage: React.FC = () => {
  const { documentId } = useParams();

  const { isLoading } = useQuery({
    queryKey: ["data-document-info"],
    queryFn: async () => DocumentsService.getDocument(+documentId!),
  });

  return (
    <div>
      <PageHeader title="Document Information" subtitle="View and manage document information" breadcrumbs={["Document Information"]} />

      <div className="w-full min-h-[300px] bg-white border-t-2 border-gray-100">{isLoading ? <LoadingIndicator /> : "has data"}</div>
    </div>
  );
};

export default DocumentViewInformationPage;
