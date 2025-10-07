/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ICONS } from "../../../assets";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import FormInstruction from "../../Reusable/FormInstruction/FormInstruction";
import { useJoinWaitlistMutation } from "../../../redux/Features/BoardroomBanter/boardroomBanterApi";
import toast from "react-hot-toast";

type TFormValues = {
  name: string;
  email: string;
  qualification: string;
  occupation: string;
  message: string;
  phoneNumber: string;
};

const JoinWaitlistForm = () => {
  const [joinWaitlist, { isLoading }] = useJoinWaitlistMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<TFormValues>();

  const [actionButtonActive, setActionButtonActive] = useState(false);
  const [actionButtonText, setActionButtonText] = useState("What do you do?");

  const instructions = [
    {
      icon: ICONS.fillForm,
      text: "Fill the form, hit Join",
    },
    {
      icon: ICONS.checkByTeam,
      text: "The Application is thoroughly checked by the team",
    },
    {
      icon: ICONS.getAccess,
      text: "Once Pass, team helps you with the further process and you get the premium access",
    },
    {
      icon: ICONS.getAccess,
      text: "Cherish a private space where ambition meets action",
    },
  ];

  const actionContents = [
    "Trader",
    "Investors",
    "Financial Professional",
    "Entrepreneur",
    "Student",
    "Other",
  ];

  const handleActionButtonClick = (item: string) => {
    setActionButtonText(item);
    setValue("occupation", item);
    trigger("occupation");
    setActionButtonActive(false);
  };

  useEffect(() => {
    register("occupation", {
      required: "Occupation is required",
    });
  }, [register]);

  const handleJoinWaitlist = async (data: TFormValues) => {
    try {
      const payload = {
        ...data,
      };
      const response = await joinWaitlist(payload).unwrap();
      if (response?.success) {
        toast.success(
          response?.message || "Application submitted successfully!",
        );
        reset();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".publishButtonOptions") &&
        !target.closest(".publishButton")
      ) {
        setActionButtonActive(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="rounded-[20px] bg-white border border-neutral-98 font-Montserrat flex flex-col md:flex-row mt-9">
      {/* Left Section */}
      <FormInstruction
        title="How the Waitlist Works?"
        instructions={instructions}
      />

      {/* Right Section - Form */}
      <div className="p-6 rounded-tr-[20px] w-full md:w-[60%] ">
        <h1 className="text-neutral-30 text-xl text-center font-bold leading-6">
          Apply for Access
        </h1>

        <form
          onSubmit={handleSubmit(handleJoinWaitlist)}
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
          <TextInput
            label="Phone Number"
            type="number"
            placeholder="for e.g., 800 788 9090"
            error={errors.phoneNumber}
            {...register("phoneNumber")}
            isRequired={false}
          />
          <TextInput
            label="Qualification"
            placeholder="e.g., Bachelors"
            error={errors.qualification}
            {...register("qualification", {
              required: "Qualification is required",
            })}
          />

          {/* Custom Dropdown */}
          <div className="relative">
            <label className="flex flex-row items-center w-full justify-between text-neutral-65">
              <span className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">
                What do you do?
              </span>
              <span>
                <span className="text-neutral-85 leading-4 text-[13px] font-medium tracking-[-0.14]">
                  {" "}
                  Required
                </span>
              </span>
            </label>
            <div className="mt-2 flex items-center w-full px-4 py-[14px] rounded-lg bg-white border-2 border-neutral-95 leading-[18px] focus:outline-none transition duration-300 relative">
              <button
                type="button"
                onClick={() => setActionButtonActive((prev) => !prev)}
                className="flex items-center justify-between cursor-pointer w-full publishButton"
              >
                {actionButtonText}
                <MdKeyboardArrowDown className="text-xl text-neutral-85" />
              </button>

              <ul
                className={`${
                  actionButtonActive
                    ? "opacity-100 z-20 translate-y-0"
                    : "opacity-0 z-[-1] translate-y-[-5px]"
                }  p-2 text-neutral-110 publishButtonOptions transition-all duration-300 absolute top-[60px] left-0 w-full bg-white border-2 border-neutral-95 rounded-xl shadow-lg`}
              >
                {actionContents.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 px-2 hover:bg-neutral-105 cursor-pointer rounded-lg"
                    onClick={() => handleActionButtonClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Textarea
            label="If we were chatting over coffee, what’s one thing you’d say about money or markets that not everyone agrees with?"
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.message}
            {...register("message")}
            isRequired={false}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              label="Join the Waitlist"
              classNames="w-full sm:w-fit"
              isLoading={isLoading}
            />
          </div>

          <p className="text-neutral-5 text-sm font-medium leading-4 text-center">
            Invites are sent based on availability and fit.
          </p>
        </form>
      </div>
    </div>
  );
};

export default JoinWaitlistForm;
