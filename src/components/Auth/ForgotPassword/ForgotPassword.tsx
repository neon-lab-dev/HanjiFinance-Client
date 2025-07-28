import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
import { useDispatch } from "react-redux";
import {
  setIsModalOpen,
  setModalType,
} from "../../../redux/Features/Auth/authModalSlice";
import { useState } from "react";

type TFormData = {
  email: string;
};
const ForgotPassword = () => {
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleVerifyOtp = (data: TFormData) => {
    console.log(data);
    setIsOtpSent(true);
  };
  return (
    <form
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="flex flex-col gap-8 px-0 lg:px-12"
    >
      <div className="flex flex-col gap-6 lg:gap-5">
        {isOtpSent && (
          <p className="text-neutral-140 leading-5">
            Reset link Has been sent to{" "}
            <span className="text-neutral-20 font-semibold hover:underline cursor-pointer">
              rahul@gmail.com
            </span>
          </p>
        )}
        <TextInput
          label="Enter Registered Email ID"
          type="number"
          placeholder="youremail@gmail.com"
          error={errors.email}
          {...register("email", {
            required: "OTP is required",
          })}
        />
      </div>

      <Button
        type="submit"
        label="Send Confirmation Email"
        variant="primary"
        classNames="w-full"
      />

      <p className="text-neutral-140 leading-3 text-center">
        Back to{" "}
        <button
          onClick={() => {
            dispatch(setModalType("login"));
            dispatch(setIsModalOpen(true));
          }}
          type="button"
          className="text-primary-20 font-semibold hover:underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default ForgotPassword;
