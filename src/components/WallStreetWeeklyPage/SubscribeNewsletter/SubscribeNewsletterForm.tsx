import { useForm } from "react-hook-form";
import FormInstruction from "../../Reusable/FormInstruction/FormInstruction";
import { ICONS } from "../../../assets";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";

type TFormValues = {
  name: string;
  email: string;
};
const SubscribeNewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const handleSubscribeNewsletter = (data: TFormValues) => {
    console.log("Form Data:", data);
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
    <div className="rounded-[20px] bg-white border border-neutral-98 font-Montserrat flex mt-9">
      {/* Left Section */}
      <FormInstruction
        title="Your newsletter has..."
        instructions={instructions}
      />

      {/* Right Section - Form */}
      <div className="p-6 rounded-tr-[20px] w-[60%]">
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
              label="Send me the next issue"
              classNames="w-full sm:w-fit"
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

export default SubscribeNewsletterForm;
