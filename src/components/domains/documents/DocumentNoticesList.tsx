import React from "react";
import { DocumentNoticeInformationItem } from "@/components/domains/documents";
import { IS_DC, IS_QMR } from "@/constants";

type Props = {
  sourceDocumentType: string;
  documentNotices?: any[];
  originatorName?: string;
  origExternalUrl?: string;
  refetch: () => void;
};

export const DocumentNoticesList: React.FC<Props> = (props) => {
  if (!props.documentNotices?.length) {
    return <p>No data available</p>;
  }

  return (
    <div className="flex flex-col gap-3 px-5">
      {props.documentNotices?.map((notice, idx) => (
        <DocumentNoticeInformationItem
          key={`doc-notice-${notice.id}`}
          data={notice}
          isFirst={idx === 0}
          originatorName={props.originatorName}
          origExternalUrl={props.origExternalUrl}
          sourceDocumentType={props.sourceDocumentType}
          showActionButtons={IS_DC || IS_QMR}
          refetch={props.refetch}
        />
      ))}
    </div>
  );
};
