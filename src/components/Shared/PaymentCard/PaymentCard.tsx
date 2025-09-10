import React, { useState } from "react";
import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";

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

type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
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
  const [isLocationModalOpen, setLocationModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [visibleTooltip, setVisibleTooltip] = useState("");

  const navigate = useNavigate();

  const cancelPayment = () => {
    navigate("/payment-cancelled");
  };
  const handleFormSubmit = (data: TFormData) => {
    console.log(data);
    setLocationModalOpen(false);
  }

  return (
    <div className="font-Montserrat py-8 md:py-16">
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center  pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Payment Page
            </h2>
            <Button
              onClick={() => {
                setLocationModalOpen(true);
              }}
              variant="custom"
              label="Add Delivery Address"
              classNames="bg-white shadow-none p-0 text-neutral-20 border-surface-90 bg-surface-30 px-4 py-2"
              icon={ICONS.addLocation}
            />
          </div>

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
                          This will help your payments get automatically
                          deducted from your bank account
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
              onClick={cancelPayment}
            />
            <Button
              type="submit"
              label="No, Don’t cancel"
              variant="primary"
              classNames="w-full"
              onClick={() => {
                setIsConfirmationModalOpen(false);
              }}
            />
          </div>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isConfirmationModalOpen={isLocationModalOpen}
        setIsConfirmationModalOpen={setLocationModalOpen}
        isCrossVisible={true}
      >
        <div className="px-12 py-6 space-y-9">
          <h3 className=" text-center text-neutral-20 text-2xl leading-7 font-medium">
            <span className="bg-primary-10 px-2 text-white mr-2">
              Delivery Address
            </span>
            Form{" "}
          </h3>
          <div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
              <TextInput
                label="Name"
                placeholder="For e.g., Mohit Naroune"
                error={errors.name}
                {...register("name", {
                  required: "Your name is required",
                })}
              />
              <TextInput
                label="Email"
                placeholder="you@email.com"
                error={errors.email}
                {...register("email", {
                  required: "Your email is required",
                })}
              />
              <TextInput
                label="Phone"
                placeholder="for e.g.,96000  16417"
                error={errors.phoneNumber}
                {...register("phoneNumber", {
                  required: "Your Phone Number is required",
                })}
                icon={ICONS.phone}
              />
              <TextInput
                label="Address Line 1"
                placeholder="House No., Street"

                error={errors.addressLine1}
                {...register("addressLine1", {
                  required: "Address Line 1 is required",
                })}
              />
              <TextInput 
                label="Address Line 2"
                placeholder="Apartment, Landmark"
                error={errors.addressLine2}
                {...register("addressLine2", {
                  required: "Address Line 2 is required", 
                })}
              />
              <TextInput
                label="PinCode"
                placeholder="For e.g., 110056"
                error={errors.zipCode}
                {...register("zipCode", {
                  required: "Zip Code is required",
                })}/>
                <TextInput
                  label="City"
                  placeholder="For e.g., Delhi" 
                  error={errors.city}
                  {...register("city", {
                    required: "City is required",
                  })}
                />
            </form>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default PaymentPage;
