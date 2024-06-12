import React from "react";
import { Badge, Button, Spinner } from "flowbite-react";
import { DocumentNoticeFormModal } from "@/components/domains/documents";
import { DocumentNoticesService } from "@/services";
import { IS_DC, IS_ORIGINATOR } from "@/constants";
import { useAuthStore } from "@/stores";
import { datesUtils } from "@/utils";

type Props = {
  showActionButtons?: boolean;
  sourceDocumentType: string;
  data?: any;
  originatorName?: string;
  origExternalUrl?: string;
  isFirst?: boolean;
  refetch: () => void;
};

export const DocumentNoticeInformationItem: React.FC<Props> = (props: any) => {
  const { user } = useAuthStore();
  const { id, revisionNumber, externalUrl, details, nature, requestedBy, approvalDate } = props.data;

  const [approveLoading, setApproveLoading] = React.useState<boolean>(false);
  const [noticeForm, setNoticeForm] = React.useState<any>({
    show: false,
    complyForDetails: "",
  });

  const handleApproveNotice = async (noticeId: number) => {
    setApproveLoading(true);
    await DocumentNoticesService.approveDocumentNotice(noticeId, setApproveLoading).finally(() => props.refetch());
  };

  const getBadgeColor = (nature: string) => {
    switch (nature) {
      case "revision":
        return "yellow";

      case "creation":
      case "addition":
        return "green";

      case "archive":
      case "deletion":
        return "failure";

      default:
        return "blue";
    }
  };

  const handleNoticeForm = (isOpen: boolean, complyForDetails?: string) => {
    setNoticeForm({ show: isOpen, complyForDetails });
  };

  const getComplyDetails = () => {
    return {
      details: noticeForm.complyDetails,
      by: user!.name,
    };
  };

  return (
    <>
      <DocumentNoticeFormModal
        show={noticeForm.show}
        fetchDocumentNotices={() => null}
        handleClose={() => handleNoticeForm(false)}
        complyDetails={getComplyDetails()}
        isOriginatorComply
      />

      <div className="w-full bg-slate-100 rounded-lg p-3">
        <div className="flex flex-row justify-between">
          <small className="text-sm font-medium">REVISION {revisionNumber}</small>

          <div className="flex flex-row gap-2">
            <Badge color="blue" className="border border-gray-600">
              Requested by &mdash; {props.isFirst ? props.originatorName : requestedBy}
            </Badge>
            <Badge color={getBadgeColor(nature)} className="border border-gray-600">
              {nature.toUpperCase()}
            </Badge>
          </div>
        </div>
        <hr className="my-3" />

        <div className="flex flex-row gap-8 border-b-2 border-gray-200 pb-3 mb-3">
          <div className="flex flex-col gap-4 text-sm w-3/4">
            <div>
              <p className="font-medium">Source Document Type</p>
              <p className="text-sm text-gray-700">{props.sourceDocumentType}</p>
            </div>
            {props.origExternalUrl && props.isFirst ? (
              <div>
                <p className="font-medium">External Url</p>
                <div className="w-3/4 break-words text-wrap">
                  <p className="text-sm text-gray-700 ">
                    <a href={props.origExternalUrl} target="_blank" className="text-blue-600 underline text-ellipsis overflow-hidden w-[500px]">
                      {props.origExternalUrl}
                    </a>
                  </p>
                </div>
              </div>
            ) : null}

            {!props.isFirst && externalUrl ? (
              <div>
                <p className="font-medium">External Url</p>
                <div className="w-3/4 break-words text-wrap">
                  <p className="text-sm text-gray-700 ">
                    <a href={externalUrl} target="_blank" className="text-blue-600 underline text-ellipsis overflow-hidden w-[500px]">
                      {externalUrl}
                    </a>
                  </p>
                </div>
              </div>
            ) : null}

            <div>
              <p className="font-medium">Details</p>
              <p className="text-sm text-gray-700">{details}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm w-1/4">
            <div>
              <p className="font-medium">Effectivity Date</p>
              <p className="text-sm text-gray-700">{"--"}</p>
            </div>

            <div>
              <p className="font-medium">Approval Date</p>
              <p className="text-sm text-gray-700 font-bold">{approvalDate ? datesUtils.formatDate(approvalDate) : "--"}</p>
            </div>

            <div className="hidden">
              <p className="font-medium">Approval Status</p>
              <p className="text-sm text-gray-700 font-bold">
                {!approvalDate ? <span className="text-yellow-400">x &nbsp;PENDING</span> : <span className="text-green-800">√ &nbsp; APPROVED</span>}
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col gap-2">
          {IS_DC && !approvalDate && props.showActionButtons ? (
            <Button size="xs" color="success" className="w-1/2" disabled={approveLoading} onClick={() => handleApproveNotice(id)}>
              {approveLoading ? <Spinner /> : "Approve"}
            </Button>
          ) : null}

          {IS_ORIGINATOR && !props.isFirst ? (
            <Button size="xs" color="success" className="w-1/2" onClick={() => handleNoticeForm(true, details)}>
              Comply
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
