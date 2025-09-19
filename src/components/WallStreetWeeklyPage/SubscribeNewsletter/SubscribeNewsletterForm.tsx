/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import FormInstruction from "../../Reusable/FormInstruction/FormInstruction";
import { ICONS } from "../../../assets";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
import { useSubscribeNewsLetterMutation } from "../../../redux/Features/NewsLetter/newsLetterApi";
import { useState } from "react";
import toast from "react-hot-toast";

type TFormValues = {
  name: string;
  email: string;
};

const SubscribeNewsletterForm = () => {
  const [subscribeNewsLetter, { isLoading }] = useSubscribeNewsLetterMutation();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const handleSubscribeNewsletter = async (data: TFormValues) => {
    try {
      const res = await subscribeNewsLetter(data).unwrap();
      console.log("Subscription successful:", res);
      setIsSubscribed(true);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Subscription failed. Please try again."
      );
    }
  };

  const instructions = [
    {
      icon: ICONS.fillForm,
      text: "Macro Radar",
    },
    {
      icon: ICONS.checkByTeam,
      text: "Money Ideas",
    },
    {
      icon: ICONS.getAccess,
      text: "Charts & Memes",
    },
  ];

  return (
    <div className="rounded-[20px] bg-white border-2 border-neutral-98 font-Montserrat flex flex-col lg:flex-row mt-9">
      {/* Left Section */}
      <FormInstruction
        title="Your newsletter has..."
        instructions={instructions}
      />

      {/* Right Section - Form */}
      {isSubscribed ? (
        <div className="flex flex-col items-center pb-12 w-full lg:w-[60%] justify-center my-14">
          <div className="size-14 rounded-full bg-success-20 flex items-center justify-center p-4">
            <img src={ICONS.tickMark} alt="" className="size-11" />
          </div>
          <h1 className="text-neutral-10 text-[17px] font-semibold leading-8 mt-8 text-center">
            Newsletter subscribed successfully!
          </h1>

          <p className="text-neutral-10 text-[15px] font-medium leading-[18px] mt-6 max-w-[550px] mx-auto text-center">
            Thanks for subscribing! You will receive your weekly newspaper in
            your inbox, do keep a check for your financial fluency!
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-tr-[20px] w-full lg:w-[60%]">
          <form
            onSubmit={handleSubmit(handleSubscribeNewsletter)}
            className="flex flex-col gap-8 mt-6 w-full"
          >
            <TextInput
              label="Name"
              placeholder="Your name"
              error={errors.name}
              {...register("name", {
                required: "Your name is required",
              })}
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="you@email.com"
              error={errors.email}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="primary"
                label="Subscribe"
                classNames="w-full sm:w-fit"
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>

            <p className="text-neutral-5 text-sm font-medium leading-4 text-center">
              Unsubscribe anytime. But chances are… you won’t.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubscribeNewsletterForm;
