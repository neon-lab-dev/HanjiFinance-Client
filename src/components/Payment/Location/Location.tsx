import { useState } from "react";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import LocationForm from "../LocationForm/LocationForm";

const Location = () => {
    
      const [isLocationModalOpen, setLocationModalOpen] = useState<boolean>(false);
  return (
    <div>  <Button
              onClick={() => {
                setLocationModalOpen(true);
              }}
              variant="custom"
              label="Add Delivery Address"
              classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
              icon={ICONS.addLocation}
            />
      <ConfirmationModal
        isConfirmationModalOpen={isLocationModalOpen}
        setIsConfirmationModalOpen={setLocationModalOpen}
        isCrossVisible={true}
      >
        <LocationForm setLocationModalOpen={setLocationModalOpen} />
      </ConfirmationModal></div>
  )
}

export default Location