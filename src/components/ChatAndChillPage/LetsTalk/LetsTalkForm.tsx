/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useEffect, useState } from "react";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import Calender from "../../Reusable/Calender/Calender";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/Features/Auth/authModalSlice";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TUser } from "../../../types/user.types";
import { useNavigate } from "react-router-dom";

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

type TFormValues = {
  name: string;
  email: string;
  qualification: string;
  occupation: string;
  topicsToDiscuss: string;
  phoneNumber: string;
  bookingDate: string;
};

const LetsTalkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  // const bookingDate = watch("bookingDate");
  const [bookingDate, setBookingDate] = useState<null | string>(null);

  const ISOFormatDate = bookingDate
    ? new Date(bookingDate).toISOString().replace("Z", "+00:00")
    : null;

  console.log(ISOFormatDate);
  const [readableDate, setReadableDate] = useState<string>("");
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser) as TUser;

  useEffect(() => {
    if (bookingDate) {
      const readable = new Date(bookingDate).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      setReadableDate(readable);
    }
  }, [bookingDate]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLetsTalk = async (data: TFormValues) => {
    if (!user) {
      toast.error("Please login to proceed");
      dispatch(openModal("login"));
      return;
    }
    setLoading(false);
    // save form data
    localStorage.setItem("chatAndChillData", JSON.stringify(data));

    // go to payment page
    navigate("/chat-and-chill-payment");
  };

  return (
    <div className="rounded-[20px] bg-white border border-neutral-98 font-Montserrat flex flex-col lg:flex-row mt-9">
      {/* Left Section (Calendar + TimePicker) */}
      <Calender onBookingChange={setBookingDate} />

      {/* Right Section - Form */}
      <div className="p-6 rounded-tr-[20px] w-full lg:w-[60%]">
        <h1 className="text-neutral-30 text-xl text-center font-bold leading-6">
          Apply for Access
        </h1>

        <form
          onSubmit={handleSubmit(handleLetsTalk)}
          className="flex flex-col gap-8 mt-6 w-full"
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            error={errors.name}
            {...register("name", { required: "Your name is required" })}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="you@email.com"
            error={errors.email}
            {...register("email", { required: "Email is required" })}
          />
          <TextInput
            label="Phone Number"
            type="number"
            placeholder="for e.g., 800 788 9090"
            error={errors.phoneNumber}
            {...register("phoneNumber")}
            isRequired={false}
          />
          <Textarea
            label="If we were chatting over coffee, what’s one thing you’d say about money or markets that not everyone agrees with?"
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.topicsToDiscuss}
            {...register("topicsToDiscuss")}
            isRequired={false}
          />

          {/* Hidden bookingDate field */}
          <input type="hidden" {...register("bookingDate")} />

          {/* Show the selected time */}
          {readableDate && (
            <p className="text-success-20 text-sm font-medium text-start">
              Slot you are booking: {readableDate}
            </p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              label="Proceed to Book @ ₹999"
              classNames="w-full sm:w-fit"
              disabled={!bookingDate}
              isLoading={loading}
            />
          </div>

          <p className="text-neutral-5 text-sm font-medium leading-4 text-center">
            Hurry up! limited slots available on first come first serve basis
          </p>
        </form>
      </div>
    </div>
  );
};

export default LetsTalkForm;
