import React from "react";
import { Button } from "flowbite-react";
import { FiLink } from "react-icons/fi";

type Props = {
  documentInformation: any;
};

export const DocumentInformation: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-5 pb-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Name:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Type:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Department:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Document Controller:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Link:</div>
        <div className="text-left text-blue-800">
          <a href={props.documentInformation.name} className="flex flex-row gap-1 items-center">
            {props.documentInformation.name}
            <FiLink />
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Series Number:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Revision Number:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Date:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5 border-b-2 border-gray-100">
        <div className="w-[180px] text-right">Approved by:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
      <div className="flex flex-row gap-5 py-5">
        <div className="w-[180px] text-right">Effectivity Date:</div>
        <div className="text-left text-gray-500">{props.documentInformation.name}</div>
      </div>
    </div>
  );
};
