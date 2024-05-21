import React from "react";
import { FiLink } from "react-icons/fi";

type Props = {
  documentInformation: any;
};

export const DocumentInformation: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-5 pb-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Name:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Type:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Department:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Document Controller:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Link:</div>
        <div className="text-left text-blue-800">
          <a href={props.documentInformation.name} className="flex flex-row gap-1 items-center">
            {props.documentInformation.name}
            <FiLink />
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Series Number:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Revision Number:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Date:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-left">Approved by:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5">
        <div className="w-[180px] text-left">Effectivity Date:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
    </div>
  );
};
