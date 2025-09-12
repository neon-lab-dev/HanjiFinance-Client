/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import PaymentCancellationForm from "../PaymentCancellationForm/PaymentCancellationForm";

interface PaymentCardProps {
  items: any;
  gstRate?: number;
  showAutopayOption?: boolean;
  isAutopayAvailable?: boolean;
  onProceed: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  items,
  gstRate = 0,
  showAutopayOption = false,
  isAutopayAvailable = false,
  onProceed,
}) => {
  const [visibleTooltip, setVisibleTooltip] = useState("");
  interface PaymentItem {
    price: number;
    quantity: number;
  }

  const itemTotal = items.reduce((sum: number, item: PaymentItem) => (sum + item.price * item.quantity), 0);
  const gstAmount = +(itemTotal * (gstRate / 100)).toFixed(2);
  const totalToPay = +(itemTotal + gstAmount).toFixed(2);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  return (
    <div className="w-full md:w-[45%] lg:w-[40%]">
      <div className="border space-y-6 border-glass-10 pt-5 bg-white rounded-2xl w-full">
        <div className="space-y-3 pb-6 px-5 border-b border-b-glass-10">
          <div className="flex justify-between text-neutral-25 leading-5 text-sm">
            <span className="">Item Total</span>
            <span className="font-medium">₹{itemTotal.toFixed(2)}</span>
          </div>
          {gstRate > 0 && (
            <div className="flex justify-between text-neutral-25 leading-5 text-sm font-medium">
              <span className="">GST (@{gstRate}%)</span>
              <span className="">₹{gstAmount.toFixed(2)}</span>
            </div>
          )}

          {showAutopayOption && (
            <div className="flex justify-between items-center  text-neutral-25 leading-5 text-sm font-medium">
              <div className="relative">
                <div className="flex justify-start items-center gap-1">
                  <p className="">Setup Autopay </p>
                  <img
                    src={ICONS.error}
                    alt="Secure Payment"
                    className="size-5 cursor-pointer"
                    onMouseEnter={() => setVisibleTooltip("bottom")}
                    onMouseLeave={() => setVisibleTooltip("")}
                  />
                </div>
                {/* tooltip */}
                <p
                  className={`${
                    visibleTooltip == "bottom"
                      ? "opacity-100 z-[100] translate-y-0"
                      : "opacity-0 z-[-1] translate-y-[-20px]"
                  } absolute left-36 md:left-[170px] transform translate-x-[-50%] -bottom-20 md:bottom-[-60px] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-xs text-white transition-all duration-200 max-w-[280px] md:max-w-[340px] text-center mx-auto`}
                >
                  This will help your payments get automatically deducted from
                  your bank account
                  {/* arrow */}
                  <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[41%] md:left-[35%] transform translate-x-[-50%] -top-1 md:top-[-8%]"></span>
                </p>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="autopay"
                    defaultChecked={!isAutopayAvailable}
                  />
                  No
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="autopay"
                    defaultChecked={isAutopayAvailable}
                  />
                  Yes
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center px-5">
          <div className="space-y-[2px]">
            {" "}
            <div className="flex justify-between items-center font-semibold text-lg">
              <span className="text-neutral-25 text-[17px] font-medium leading-5 tracking-[-0.18px]">
                To Pay
              </span>
            </div>
            <p className="text-[13px] leading-4 tracking-[-0.14px] text-neutral-85">
              Incl. of all taxes and charges
            </p>
          </div>
          <span className="text-neutral-25 text-xl font-bold leading-6 tracking-[-0.2]">
            ₹{totalToPay.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-4  w-full justify-center items-center px-5">
          <div className="w-[40%]">
            <Button
              type="submit"
              label="Cancel"
              variant="tertiary"
              classNames="w-full"
              onClick={() => setIsConfirmationModalOpen(true)}
            />
          </div>
          <div className="w-[60%]">
            <Button
              type="submit"
              label="Proceed to Pay"
              variant="primary"
              classNames="w-full"
              onClick={onProceed}
            />
          </div>
        </div>

        <div className="flex justify-center py-2 items-center gap-4">
          <img
            src={IMAGES.secure1}
            alt="Secure Payment"
            className="h-6 w-[55px]"
          />
          <img
            src={IMAGES.razerPay}
            alt="Secure Payment"
            className="h-4 w-21"
          />
          <img src={IMAGES.secure2} alt="Secure Payment" className="h-8 w-9" />
        </div>
      </div>

      <ConfirmationModal
        isConfirmationModalOpen={isConfirmationModalOpen}
        setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        isCrossVisible={false}
      >
        <PaymentCancellationForm
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      </ConfirmationModal>
    </div>
  );
};

export default PaymentCard;
