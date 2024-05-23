import React from "react";
import { DocumentNoticeInformationItem } from "@/components/domains/documents";

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
        <DocumentNoticeInformationItem
          key={`doc-notice-${notice.id}`}
          data={notice}
          sourceDocumentType={props.sourceDocumentType}
          showActionButtons={index !== 0}
        />
      ))}
    </div>
  );
};
