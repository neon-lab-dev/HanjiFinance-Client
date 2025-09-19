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
import {
  setRedirectPath,
  useCurrentUser,
} from "../../../redux/Features/Auth/authSlice";
import type { TUser } from "../../../types/user.types";
import { useNavigate } from "react-router-dom";

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

  const [readableDate, setReadableDate] = useState<string>("");
  useEffect(() => {
  if (!bookingDate) return;

  const dateObj = new Date(bookingDate);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" }); // September
  const year = dateObj.getFullYear();

  // Function to get ordinal suffix
  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  setReadableDate(`${day}${getOrdinal(day)} ${month}, ${year}`);
}, [bookingDate]);
  const [bookingDateISO, setBookingDateISO] = useState<string>("");
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser) as TUser;

  useEffect(() => {
    if (bookingDate) {
      const date = new Date(bookingDate);

      // Set time to UTC midnight
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      // Convert to ISO and replace Z with +00:00
      const isoDate = utcDate.toISOString().replace("Z", "+00:00");

      setBookingDateISO(isoDate);
    }
  }, [bookingDate]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLetsTalk = async (data: TFormValues) => {
    if (!user) {
      toast.error("Please login to proceed");
      dispatch(openModal("login"));
      dispatch(setRedirectPath("/chat-and-chill-payment"));
      return;
    }
    setLoading(false);
    const chatAndChillData = {
      bookingDate: bookingDateISO,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      topicsToDiscuss: data?.topicsToDiscuss,
    };

    localStorage.setItem("chatAndChillData", JSON.stringify(chatAndChillData));
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
              Slot you are booking: {readableDate}, 7:00 PM
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
