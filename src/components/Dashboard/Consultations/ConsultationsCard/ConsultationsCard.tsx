/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { ICONS } from "../../../../assets";
import { useUpdateStatusMutation } from "../../../../redux/Features/ChatAndChill/chatAndChillApi";
import Button from "../../../Reusable/Button/Button";

interface ConsultationsCardProps {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  statusType?: "success" | "warning" | "error";
  meetingLink?: string;
}

const ConsultationsCard: React.FC<ConsultationsCardProps> = ({
  id,
  title,
  subtitle,
  date,
  time,
  duration,
  status,
  meetingLink,
}) => {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const handleUpdateStatus = async () => {
    const payload = {
      status: "cancelled",
    };
    try {
      await toast.promise(updateStatus({ data: payload, id }).unwrap(), {
        loading: "Cancelling meeting...",
        success: () => "Meeting cancelled!",
        error: (err: any) => err?.data?.message || "Something went wrong!",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };
  const statusColors: Record<string, string> = {
    booked: "text-blue-600 bg-blue-100 border-blue-400",
    scheduled: "text-purple-600 bg-purple-100 border-purple-400",
    cancelled: "text-red-600 bg-red-100 border-red-400",
    completed: "text-green-600 bg-green-100 border-green-400",
  };
  return (
    <div className="flex justify-between items-start bg-surface-30 p-4 border-[1px] rounded-lg border-neutral-98 font-Montserrat">
      <div className="flex items-start justify-start gap-4">
        <div className="size-[30px] w-[30px] p-[6px] bg-success-30 flex justify-center items-center rounded-full">
          <img src={ICONS.greenTick} className="size-6" />
        </div>
        <div className="text-neutral-20">
          <h2 className="font-medium leading-[22px]">{title}</h2>
          <p className="mt-1 tet-[13px] leading-4">{subtitle}</p>
          <div className="flex items-center justify-start gap-4 mt-4 text-neutral-85">
            <div className="flex gap-1 items-center justify-center">
              <img src={ICONS.calendarMinimalistic} className="size-4" />
              <p className="text-[13px] leading-4">{date}</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <img src={ICONS.clockSquare} className="size-4" />
              <p className="text-[13px] leading-4">{time}</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <img src={ICONS.duration} className="size-4" />
              <p className="text-[13px] leading-4">{duration}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <a href={meetingLink} target="_blank">
              <Button
                disabled={
                  !meetingLink ||
                  status === "completed" ||
                  status === "cancelled"
                }
                label="Join Session"
                variant="primary"
                classNames="px-4 py-2"
              />
            </a>

            <Button
              disabled={status === "completed" || status === "cancelled"}
              label={status === "cancelled" ? "Cancelled" : "Cancel"}
              variant={status === "cancelled" ? "custom" : "secondary"}
              classNames="px-4 py-2"
              onClick={handleUpdateStatus}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <div
        className={`border-[1px] rounded-sm p-1 text-[13px] leading-4 font-medium capitalize ${statusColors[status]}`}
      >
        {status === "booked" ? "Not scheduled yet" : status} 
      </div>
    </div>
  );
};

export default ConsultationsCard;
