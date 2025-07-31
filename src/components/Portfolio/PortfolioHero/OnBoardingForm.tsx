import { useForm } from "react-hook-form";
import Button from "../../Reusable/Button/Button";
import TextInput from "../../Reusable/TextInput/TextInput";
type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
interface OnBoardingFormProps {
  onSubmitSuccess: () => void;
}

const OnBoardingForm = ({ onSubmitSuccess }: OnBoardingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSignup = (data: TFormData) => {
    console.log("Form Data:", data);
    onSubmitSuccess(); // callback to PortfolioHero
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="w-full px-8 pt-8 pb-6 flex flex-col border font-Montserrat border-neutral-98 rounded-xl justify-center items-center gap-5 "
    >
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
        type="email"
        placeholder="you@email.com"
        error={errors.email}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <Button
        type="submit"
        label="Submit"
        variant="primary"
        classNames="w-fit px-8 mt-4"
      />
    </form>
  );
};

export default OnBoardingForm;
