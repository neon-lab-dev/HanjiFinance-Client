interface SlotCardProps {
  date: string;
}

const AvailableSlotsCard = ({ date }: SlotCardProps) => {
  return (
    <div className="flex justify-between items-center bg-surface-30 p-4 border-[1px] rounded-lg border-neutral-98 font-Montserrat">
      <div className="flex items-center justify-start gap-4">
        <span className="font-medium leading-[22px] text-neutral-20">
          {date}
        </span>
        <p className="text-neutral-85 text-[13px] leading-4 "><p className="text-neutral-85 text-[13px] leading-4 ">7:00 PM - 7:30 PM</p></p>
      </div>
      <div className="border-[1px] rounded-sm p-1 border-success-25 bg-surface-5 text-success-20 text-[13px] leading-4 font-medium ">
        Available
      </div>
    </div>
  );
};

export default AvailableSlotsCard;
