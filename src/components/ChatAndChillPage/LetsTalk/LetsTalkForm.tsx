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
import { useGetRazorpayKeyQuery } from "../../../redux/Features/User/userApi";
import { useCheckoutMutation } from "../../../redux/Features/ChatAndChill/chatAndChillApi";

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
    setValue,
    watch,
    formState: { errors },
  } = useForm<TFormValues>();

  const bookingDate = watch("bookingDate");
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

  const { data: apiKey } = useGetRazorpayKeyQuery({});
  // console.log(data);
  const [checkout] = useCheckoutMutation();

  const [loading, setLoading] = useState(false);

  const totalAmount = 999;

  const handleLetsTalk = async (data: TFormValues) => {
    if (!user) {
      toast.error("Please login to proceed");
      dispatch(openModal("login"));
      return;
    }

    setLoading(true);

    const payload = {
      amount:totalAmount
    }

    let response;
    try {
      response = await checkout(payload);
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    try {
      const options = {
        key: apiKey?.key,
        amount: response?.data?.amount,
        currency: "INR",
        name: "Hanjifinance",
        description: "Test Transaction",
        image: "https://i.ibb.co/0jpqmJzJ/logo.png",
        order_id: response?.data?.id,
        callback_url : "http://localhost:5000/api/v1/chat-and-chill/verify-payment",
        // callback_url : "https://hanjifinance-api.vercel.app/api/v1/chat-and-chill/verify-payment",
        prefill: {
          name: user?.name,
          email: user?.email,
          userId: user?._id,
        },
        theme: { color: "#b91c1c" },
      };

      // **Directly open Razorpay** here in the click handler
      const rzp = new window.Razorpay(options);
      rzp.open();

      const chatAndChillData = {
        bookingDate,
        name: data?.name,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        topicsToDiscuss: data?.topicsToDiscuss,
      };

      localStorage.setItem(
        "chatAndChillData",
        JSON.stringify(chatAndChillData)
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[20px] bg-white border border-neutral-98 font-Montserrat flex flex-col lg:flex-row mt-9">
      {/* Left Section (Calendar + TimePicker) */}
      <Calender onBookingChange={(value) => setValue("bookingDate", value)} />

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
