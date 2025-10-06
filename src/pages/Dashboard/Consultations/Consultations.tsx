import { useNavigate } from "react-router-dom";
import AvailableSlotsList from "../../../components/Dashboard/Consultations/AvailableSlotsList/AvailableSlotsList";
import ConsultationsSection from "../../../components/Dashboard/Consultations/ConsultationsSection/ConsultationsSection";
import Button from "../../../components/Reusable/Button/Button";
import { ICONS } from "../../../assets";

const Consultations = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="w-full flex item-center justify-end">
        <Button
          onClick={() => {
            navigate("/dashboard/book-new-session");
          }}
          variant="custom"
          label="Book A Call"
          classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
          icon={ICONS.noteBook}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-6 w-full">
        <div className="w-full lg:w-[65%]">
          <ConsultationsSection />
        </div>
        <div className="w-full lg:w-[35%] sticky top-0">
          <AvailableSlotsList />
        </div>
      </div>
    </div>
  );
};

export default Consultations;
