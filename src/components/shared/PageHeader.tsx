import React from "react";
import { Breadcrumb } from "flowbite-react";

type Props = {
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<string>;
  children?: React.ReactNode;
};

export const PageHeader: React.FC<Props> = (props) => {
  const breadcrumbItems = ["dashboard-home"];

  React.useEffect(() => {
    if (props.breadcrumbs) {
      props.breadcrumbs.forEach((crumb) => breadcrumbItems.push(crumb));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row justify-between max-md:flex-col max-md:gap-8 items-start px-5 mb-8">
      <div className="w-full lex flex-col gap-1">
        <Breadcrumb className="mb-2">
          <Breadcrumb.Item className="capitalize">
            <span className="text-xs">Dashboard Home</span>
          </Breadcrumb.Item>

          {props.breadcrumbs?.length
            ? props.breadcrumbs.map((item) => (
                <Breadcrumb.Item key={`breadcrumb-item-${item}`} className="capitalize">
                  <span className="text-xs">{item.replaceAll("-", " ")}</span>
                </Breadcrumb.Item>
              ))
            : null}
        </Breadcrumb>

        <h1 className="text-xl">{props.title}</h1>
        <p className="text-sm text-gray-600">{props.subtitle}</p>
      </div>
      {props.children ? <div className="w-full">{props.children}</div> : null}
    </div>
  );
};
