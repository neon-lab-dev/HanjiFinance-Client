import React, { useState } from "react";
import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

type ProductItem = {
  name: string;
  price: number;
  subtitle?: string;
};

type PaymentPageProps = {
  items: ProductItem[];
  gstRate?: number;
  showAutopayOption?: boolean;
  isAutopayAvailable?: boolean;
  onProceed: () => void;
};

const PaymentPage: React.FC<PaymentPageProps> = ({
  items,
  gstRate = 18,
  showAutopayOption = false,
  isAutopayAvailable = false,
  onProceed,
}) => {
  const itemTotal = items.reduce((sum, item) => sum + item.price, 0);
  const gstAmount = +(itemTotal * (gstRate / 100)).toFixed(2);
  const totalToPay = +(itemTotal + gstAmount).toFixed(2);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const cancelPayment = () => {
    navigate("/payment-cancelled")
  }

  return (
    <div className="font-Montserrat py-8 md:py-16">
      <Container>
        <div className="space-y-8">
          <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px] pb-8 border-b border-b-neutral-97">
            Payment Page
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31">
            <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-5">
              {items.map((item, index) => (
                <div key={index} className="mb-4 flex justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-neutral-25 leading-[22px]">
                      {item.name}
                    </h3>
                    {item.subtitle && (
                      <p className="text-[13px] leading-4 text-neutral-70 tracking-[-0.14px]">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-[17px] font-semibold leading-5 text-neutral-20">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full md:w-[45%] lg:w-[40%]">
              <div className="border space-y-6 border-glass-10 pt-5 bg-white rounded-2xl w-full">
                <div className="space-y-3 pb-6 px-5 border-b border-b-glass-10">
                  <div className="flex justify-between text-neutral-25 leading-5 text-sm">
                    <span className="">Item Total</span>
                    <span className="font-medium">₹{itemTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-neutral-25 leading-5 text-sm font-medium">
                    <span className="">GST (@{gstRate}%)</span>
                    <span className="">₹{gstAmount.toFixed(2)}</span>
                  </div>

                  {showAutopayOption && (
                    <div className="flex justify-between items-center  text-neutral-25 leading-5 text-sm font-medium">
                      <div className="flex justify-start items-center gap-1">
                        <p className="">Setup Autopay </p>
                        <img
                          src={ICONS.error}
                          alt="Secure Payment"
                          className="size-5"
                        />
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
                  <img
                    src={IMAGES.secure2}
                    alt="Secure Payment"
                    className="h-8 w-9"
                  />
                </div>
              </div>
            </div>
          </div>
          {
            <p className="text-neutral-25 text-sm leading-5 w-full md:w-[60%] ">
              Note : Cancel your subscription anytime, you can connect to out
              team via email . hanjifinance@gmal.com for any discrepancy
            </p>
          }
        </div>
      </Container>

      <ConfirmationModal
        isConfirmationModalOpen={isConfirmationModalOpen}
        setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        isCrossVisible={false}
      >
        <div>
          <p className="text-neutral-25 font-medium leading-5 text-center p-6">
            Are you sure you want to cancel your payment?
          </p>
          <hr className="border border-neutral-99 h-[1px] w-full" />
          <div className="p-6 flex items-center justify-center gap-4">
            <Button
              type="submit"
              label="Yes, Cancel"
               variant="tertiary"
              classNames="w-full"
              onClick={cancelPayment }
            />
            <Button
              type="submit"
              label="No, Don’t cancel"  
              variant="primary"
              classNames="w-full"
            />
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default PaymentPage;
