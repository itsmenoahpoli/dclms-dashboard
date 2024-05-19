import React from "react";
import { Spinner } from "flowbite-react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-[200px]">
      <Spinner />
      <small className="text-gray-600">Loading</small>
    </div>
  );
};
