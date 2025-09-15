import AvailableSlotsList from "../../../components/Dashboard/Consultations/AvailableSlotsList/AvailableSlotsList";
import ConsultationsSection from "../../../components/Dashboard/Consultations/ConsultationsSection/ConsultationsSection";

const Consultations = () => {
 
  return (
    <div>
      <div></div>
      <div className="flex justify-between gap-6 w-full">
        <div className="w-[65%]">
          <ConsultationsSection />
        </div>
        <div className="w-[35%] sticky top-0">
          <AvailableSlotsList />
        </div>
      </div>
    </div>
  );
};

export default Consultations;
