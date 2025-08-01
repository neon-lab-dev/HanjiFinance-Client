import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useState } from "react";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import Button from "../../Reusable/Button/Button";
import { setIsModalOpen, setModalType } from "../../../redux/Features/Auth/authModalSlice";
import { useDispatch } from "react-redux";

type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TFormData>();

  const password = watch("password");

  const handleSignup = (data: TFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex flex-col gap-6 lg:gap-5 px-0 lg:px-12"
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
        placeholder="for e.g., 8007889090"
        error={errors.phoneNumber}
        {...register("phoneNumber", {
          required: "Phone number is required",
          minLength: {
            value: 10,
            message: "Phone number must be exactly 10 digits",
          },
          maxLength: {
            value: 10,
            message: "Phone number must be exactly 10 digits",
          },
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone number must contain only digits",
          },
        })}
      />

      <PasswordInput
        label="Password"
        placeholder="Must be at least 8 Characters"
        error={errors.password}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Re-type your password"
        error={errors.confirmPassword}
        {...register("confirmPassword", {
          required: "Confirm password is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
        isPasswordVisible={isConfirmPasswordVisible}
        setIsPasswordVisible={setIsConfirmPasswordVisible}
      />

      <p className="text-neutral-140 leading-5">
        By signing up, you agree to our{" "}
        <Link
          to="/terms-and-conditions"
          className="text-primary-20 font-semibold hover:underline"
        >
          Terms and Conditions.
        </Link>
      </p>

      <Button
        type="submit"
        label="Sign Up"
        variant="primary"
        classNames="w-full"
      />
      <p className="text-neutral-140 leading-5 mt-2 text-center">
        Already Registered?{" "}
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

export default Signup;
