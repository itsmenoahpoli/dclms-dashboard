import React from "react";
import { Badge } from "flowbite-react";
import { FiLink } from "react-icons/fi";
import { datesUtils } from "@/utils";

type Props = {
  documentInformation: any;
};

export const DocumentInformation: React.FC<Props> = (props) => {
  const getRevisionNumber = () => {
    const notices = props.documentInformation.documentNotices;

    if (notices.length) {
      if (notices.length === 1) {
        return notices[0].revisionNumber;
      }

      return notices[notices.length - 1].revisionNumber;
    }

    return 0;
  };

  const getLastUpdateDate = (createdAt: string, updatedAt: string) => {
    if (createdAt === updatedAt) return "--";

    return datesUtils.formatDate(props.documentInformation.updatedAt, "MMM D, YYYY");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-5 pb-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Name:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Type:</div>
        <div className="text-left text-gray-500">
          <Badge color="green">{props.documentInformation.sourceDocument}</Badge>
        </div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Department:</div>
        <div className="text-left text-gray-500">{props.documentInformation.department.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Submitted by:</div>
        <div className="text-left text-gray-500">{props.documentInformation.originator.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Link:</div>
        <p className="text-left text-blue-800 flex">
          <a href={props.documentInformation.externalUrl} className="flex flex-row gap-1 items-center truncate w-[300px]" target="_blank">
            {props.documentInformation.externalUrl}
            <FiLink />
          </a>
        </p>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Series Number:</div>
        <div className="text-left text-gray-500">{props.documentInformation.seriesNumber}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Revision Number:</div>
        <div className="text-left text-gray-500">{getRevisionNumber()}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Date Created:</div>
        <div className="text-left text-gray-500">{datesUtils.formatDate(props.documentInformation.createdAt, "MMM D, YYYY")}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Last Updated:</div>
        <div className="text-left text-gray-500">{getLastUpdateDate(props.documentInformation.createdAt, props.documentInformation.updatedAt)}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Approved by:</div>
        <div className="text-left text-gray-500">--</div>
      </div>
      <div className="flex flex-row gap-5 py-5">
        <div className="w-[180px] text-left">Effectivity Date:</div>
        <div className="text-left text-gray-500">{props.documentInformation.effectivityDate || "--"}</div>
      </div>
    </div>
  );
};
