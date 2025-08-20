import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

interface ConsultationsCardProps {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  duration: string;
  // status: string;
  statusType?: "success" | "warning" | "error"; // optional for future status colors
  onJoin?: () => void;
  onCancel?: () => void;
}

const ConsultationsCard: React.FC<ConsultationsCardProps> = ({
  title,
  subtitle,
  date,
  time,
  duration,
  // status,
  onJoin,
  onCancel,
}) => {
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
            <Button
              label="Join Session"
              variant="primary"
              classNames="px-4 py-2"
              onClick={onJoin}
            />
            <Button
              label="Cancel"
              variant="secondary"
              classNames="px-4 py-2"
              onClick={onCancel}
            />
          </div>
        </div>
      </div>
      <div className="border-[1px] rounded-sm p-1 border-success-25 bg-surface-5 text-success-20 text-[13px] leading-4 font-medium ">
        Complete
      </div>
    </div>
  );
};

export default ConsultationsCard;
