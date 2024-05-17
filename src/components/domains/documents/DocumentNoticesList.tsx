import React from "react";

type Props = {
  documentNotices?: any[];
};

export const DocumentNoticesList: React.FC<Props> = (props) => {
  console.log(props);
  return <div className="px-5">{props.documentNotices?.length ? "" : "No data available"}</div>;
};
