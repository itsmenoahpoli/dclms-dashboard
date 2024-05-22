import React from "react";
import { DocumentNoticeInformation } from "@/components/domains/documents";

type Props = {
  sourceDocumentType: string;
  documentNotices?: any[];
};

export const DocumentNoticesList: React.FC<Props> = (props) => {
  if (!props.documentNotices?.length) {
    return <p>No data available</p>;
  }

  return (
    <div className="flex flex-col gap-3 px-5">
      {props.documentNotices?.map((notice, index) => (
        <DocumentNoticeInformation
          key={`doc-notice-${notice.id}`}
          data={notice}
          sourceDocumentType={props.sourceDocumentType}
          showActionButtons={index !== 0}
        />
      ))}
    </div>
  );
};
