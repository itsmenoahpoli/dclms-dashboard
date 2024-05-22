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
        console.log(notices[0].revisionNumber);
      }

      return notices[notices.length - 1].revisionNumber;
    }

    return 0;
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
          <a href={props.documentInformation.name} className="flex flex-row gap-1 items-center truncate w-[300px]">
            {props.documentInformation.externalUrl}
            <FiLink />
          </a>
          <span>....</span>
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
        <div className="w-[180px] text-left">Date:</div>
        <div className="text-left text-gray-500">{datesUtils.formatDate(props.documentInformation.createdAt, "MMM D, YYYY")}</div>
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
