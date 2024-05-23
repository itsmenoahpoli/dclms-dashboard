import React from "react";
import { Badge, Button } from "flowbite-react";
import { roleUtils } from "@/utils";
import { USER_ROLES } from "@/constants";

type Props = {
  showActionButtons?: boolean;
  data?: any;
  sourceDocumentType: string;
};

export const DocumentNoticeInformation: React.FC<Props> = (props: any) => {
  const { id, revisionNumber, details, nature } = props.data;

  const IS_NOT_ORIGINATOR = roleUtils.checkRole(USER_ROLES.DC) || roleUtils.checkRole(USER_ROLES.QMR);

  const handleApproveNotice = (noticeId: number) => {
    console.log(noticeId);
  };

  const getBadgeColor = (nature: string) => {
    switch (nature) {
      case "revision":
        return "yellow";

      case "archive":
      case "deletion":
        return "failure";

      default:
        return "blue";
    }
  };

  return (
    <div className="w-full bg-slate-100 rounded-lg p-3">
      <div className="flex flex-row justify-between">
        <small className="text-sm font-medium">REVISION {revisionNumber}</small>
        <Badge color={getBadgeColor(nature)} className="border border-gray-600">
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

      <div className="flex flex-col gap-2">
        {IS_NOT_ORIGINATOR && props.showActionButtons ? (
          <Button size="xs" color="success" onClick={() => handleApproveNotice(id)}>
            Approve
          </Button>
        ) : null}
      </div>
    </div>
  );
};
