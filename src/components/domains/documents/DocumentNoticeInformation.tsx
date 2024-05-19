import React from "react";
import { Badge, Button } from "flowbite-react";

type Props = {
  showActionButtons?: boolean;
  data?: any;
  sourceDocumentType: string;
};

export const DocumentNoticeInformation: React.FC<Props> = (props: any) => {
  const { id, revisionNumber, details, nature } = props.data;

  const handleApproveNotice = (noticeId: number) => {
    console.log(noticeId);
  };

  return (
    <div className="w-full bg-slate-100 rounded-lg p-3">
      <div className="flex flex-row justify-between">
        <small className="text-sm font-medium">Revision {revisionNumber}</small>
        <Badge color="blue" className="border border-blue-600">
          {nature.toUpperCase()}
        </Badge>
      </div>
      <hr className="my-3" />

      <div className="flex flex-row gap-8 border-b-2 border-gray-200 pb-3 mb-3">
        <div className="flex flex-col gap-4 text-sm w-3/4">
          <div>
            <p className="font-medium">Source Document Type</p>
            <p className="text-sm text-gray-700">{props.sourceDocumentType}</p>
          </div>

          <div>
            <p className="font-medium">Details</p>
            <p className="text-sm text-gray-700">{details}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm w-1/4">
          <div>
            <p className="font-medium">Effectivity Date</p>
            <p className="text-sm text-gray-700">{props.effectivityDate || "--"}</p>
          </div>

          <div>
            <p className="font-medium">Approval Status</p>
            <p className="text-sm text-gray-700 font-bold">
              {props.approvedBy ? <span className="text-green-800">APPROVED</span> : <span className="text-yellow-400">PENDING</span>}
            </p>
          </div>
        </div>
      </div>

      {props.showActionButtons ? (
        <Button size="xs" color="success" onClick={() => handleApproveNotice(id)}>
          Approve Notice
        </Button>
      ) : null}
    </div>
  );
};
