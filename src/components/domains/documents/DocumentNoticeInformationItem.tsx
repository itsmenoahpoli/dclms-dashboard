import React from "react";
import { Badge, Button } from "flowbite-react";
import { DocumentNoticeFormModal } from "@/components/domains/documents";
import { DocumentNoticesService } from "@/services";
import { IS_ORIGINATOR } from "@/constants";
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
  const { id, documentId, revisionNumber, externalUrl, details, nature, requestedBy, complyBy, approvalDate, documentNoticeComply } = props.data;

  const [approveLoading, setApproveLoading] = React.useState<boolean>(false);
  const [noticeForm, setNoticeForm] = React.useState<any>({
    show: false,
    complyForDetails: "",
  });

  console.log(approveLoading);

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

  console.log({
    details: noticeForm.complyDetails,
    by: user!.name,
    type: "comply",
    documentId,
  });

  const getComplyDetails = () => {
    return {
      complyDetails: noticeForm.complyDetails,
      complyBy: user!.name,
      type: "comply",
      documentNoticeId: +id,
      documentId,
    };
  };

  const handleUpdateComply = async (documentNoticeComplyId: number, status: "approved" | "declined") => {
    const data = {
      documentNoticeComplyId,
      status,
    };

    if (status === "approved") {
      await handleApproveNotice(id);
    }

    return await DocumentNoticesService.updateDocumentNoticeComplyStatus(data).finally(() => props.refetch());
  };

  return (
    <>
      <DocumentNoticeFormModal
        show={noticeForm.show}
        sourceDocument={props.sourceDocumentType}
        fetchDocumentNotices={props.refetch}
        handleClose={() => handleNoticeForm(false)}
        complyDetails={getComplyDetails()}
        isOriginatorComply
      />

      <div className="w-full bg-slate-100 rounded-lg p-3">
        <div className="flex flex-row justify-between">
          <small className="text-sm font-medium">REVISION {revisionNumber}</small>

          <div className="flex flex-row gap-2">
            <Badge color="blue" className="border border-gray-600">
              {complyBy ? "Complied by" : "Requested By"} by &mdash; {props.isFirst ? props.originatorName : requestedBy}
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

        {documentNoticeComply && documentNoticeComply.length ? (
          <div className="p-3">
            <div className="w-full bg-white rounded shadow p-4">
              <p className="text-sm text-gray-700 font-bold">Comply Details</p>

              <div className="flex flex-row justify-between py-2">
                <div className="flex flex-col gap-4 text-sm w-1/4">
                  <div>
                    <p className="font-medium">Date Submitted</p>
                    <p className="text-sm text-gray-700">{datesUtils.formatDate(documentNoticeComply[0].createdAt)}</p>
                  </div>

                  <div>
                    <p className="font-medium">Details</p>
                    <p className="text-sm text-gray-700">{documentNoticeComply[0].details}</p>
                  </div>

                  <div>
                    <p className="font-medium">Page No.</p>
                    <p className="text-sm text-gray-700">{documentNoticeComply[0].pageNumber}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-sm w-2/4">
                  <div>
                    <p className="font-medium">External Url</p>
                    <div className="w-3/4 break-words text-wrap">
                      <p className="text-sm text-gray-700 ">
                        <a
                          href={documentNoticeComply[0].externalUrl}
                          target="_blank"
                          className="text-blue-600 underline text-ellipsis overflow-hidden w-[500px]"
                        >
                          {documentNoticeComply[0].externalUrl}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Details</p>
                    <p className="text-sm text-gray-700">{documentNoticeComply[0].details}</p>
                  </div>

                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-sm text-gray-700 uppercase font-bold">{documentNoticeComply[0].status}</p>
                  </div>
                </div>
              </div>

              <hr />

              {!IS_ORIGINATOR && documentNoticeComply[0].status === "pending" ? (
                <div className="flex flex-row gap-3 pt-5">
                  <Button size="xs" color="success" onClick={() => handleUpdateComply(documentNoticeComply[0].id, "approved")}>
                    Approve
                  </Button>
                  <Button size="xs" color="failure" onClick={() => handleUpdateComply(documentNoticeComply[0].id, "declined")}>
                    Decline
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="pb-10">
          <hr />
        </div>

        <div className="w-1/3 flex flex-col gap-2">
          {/* {(IS_DC || IS_SUPERADMIN) && !approvalDate && props.showActionButtons ? (
            <Button size="xs" color="success" className="w-1/2" disabled={approveLoading} onClick={() => handleApproveNotice(id)}>
              {approveLoading ? <Spinner /> : "Approve"}
            </Button>
          ) : null} */}

          {IS_ORIGINATOR && !props.isFirst && !approvalDate && requestedBy === "Document Controller" ? (
            <Button size="xs" color="success" className="w-1/2" onClick={() => handleNoticeForm(true, details)}>
              Comply
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
