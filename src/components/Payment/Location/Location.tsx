/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import LocationForm from "../LocationForm/LocationForm";

const Location = ({
  myProfile,
  isLoading,
  isLocationModalOpen,
  setLocationModalOpen,
}: any) => {
  const [address, setAddress] = useState(false);

  useEffect(() => {
    if (myProfile?.addressLine1) {
      setAddress(true);
    } else {
      setAddress(false);
    }
  }, [myProfile]);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {address ? (
        <div className="">
          <div className="flex items-center justify-start gap-2">
            <h3 className="font-semibold text-neutral-20">Delivery Address</h3>
            <img
              onClick={() => setLocationModalOpen(true)}
              src={ICONS.pen}
              alt=""
              className="size-4 cursor-pointer"
            />{" "}
          </div>
          <p className="text-neutral-20 text-sm font-medium">
            Delivery Address: {myProfile?.addressLine1}
          </p>
        </div>
      ) : (
        <>
          <Button
            onClick={() => setLocationModalOpen(true)}
            variant="custom"
            label="Add Delivery Address"
            classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
            icon={ICONS.addLocation}
          />
        </>
      )}
      <ConfirmationModal
        isConfirmationModalOpen={isLocationModalOpen}
        setIsConfirmationModalOpen={setLocationModalOpen}
        isCrossVisible={true}
      >
        <LocationForm setLocationModalOpen={setLocationModalOpen} />
      </ConfirmationModal>
    </div>
  );
};

export default Location;
