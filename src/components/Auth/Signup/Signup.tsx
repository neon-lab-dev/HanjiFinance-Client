import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useState } from "react";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";

type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};
const Signup = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSignup = (data: TFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex flex-col gap-6 lg:gap-5 px-12"
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
      <TextInput
        label="Phone Number"
        type="number"
        placeholder="for e.g., 800 788 9090"
        error={errors.phoneNumber}
        {...register("phoneNumber", {
          required: "Phone number is required",
        })}
      />
      <PasswordInput
        label="Password"
        placeholder="Must be at least 8 Characters"
        error={errors.password}
        {...register("password", {
          required: "Password is required",
        })}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />
    </form>
  );
};

export default Signup;
