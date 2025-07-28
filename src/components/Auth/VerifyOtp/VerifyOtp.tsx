import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
import {
  setIsModalOpen,
  setModalType,
} from "../../../redux/Features/Auth/authModalSlice";

type TFormData = {
  otp: string | number;
};

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleVerifyOtp = (data: TFormData) => {
    console.log(data);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <form
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="flex flex-col gap-8 px-0 lg:px-12"
    >
      <div className="flex flex-col gap-6 lg:gap-5">
        <p className="text-neutral-140 leading-5">
          OTP Has been sent to{" "}
          <span className="text-neutral-20 font-semibold hover:underline cursor-pointer">
            rahul@gmail.com
          </span>
        </p>
        <TextInput
          label="Email"
          type="number"
          placeholder="Enter the 6-digit OTP to verify"
          error={errors.otp}
          {...register("otp", {
            required: "OTP is required",
          })}
        />
      </div>

      <Button
        type="submit"
        label="Verify OTP"
        variant="primary"
        classNames="w-full"
      />

      {canResend ? (
        <button
          onClick={() => {
            dispatch(setModalType("signup"));
            dispatch(setIsModalOpen(true));
          }}
          type="button"
          className="text-primary-20 font-semibold hover:underline cursor-pointer"
        >
          Resend OTP
        </button>
      ) : (
        <p className="text-primary-20 leading-5 text-center font-semibold">
          Resend OTP{" "}
          <span className="font-normal">(in {secondsLeft} seconds)</span>
        </p>
      )}
    </form>
  );
};

export default VerifyOtp;
