import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import Button from "../../Reusable/Button/Button";
import {
  setIsModalOpen,
  setModalType,
} from "../../../redux/Features/Auth/authModalSlice";

type TFormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormData>();
  const password = watch("password");

  const handleLogin = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-6 lg:gap-5 px-0 lg:px-12"
    >
      <PasswordInput
        label="New Password"
        placeholder="Must be at least 8 Characters"
        error={errors.password}
        {...register("password", {
          required: "New Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />

      <PasswordInput
        label="Confirm New Password"
        placeholder="Re-type your password"
        error={errors.confirmPassword}
        {...register("confirmPassword", {
          required: "Confirm new password is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
        isPasswordVisible={isConfirmPasswordVisible}
        setIsPasswordVisible={setIsConfirmPasswordVisible}
      />

      <Button
        type="submit"
        label="Save New Password"
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

export default ResetPassword;
