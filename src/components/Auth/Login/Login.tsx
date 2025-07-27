import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import Button from "../../Reusable/Button/Button";
import {
  setIsModalOpen,
  setModalType,
} from "../../../redux/Features/Auth/authModalSlice";
import { useDispatch } from "react-redux";

type TFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleLogin = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-6 lg:gap-5 px-0 lg:px-12"
    >
      <TextInput
        label="Email"
        type="email"
        placeholder="you@email.com"
        error={errors.email}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <div className="flex flex-col gap-[6px]">
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

        <div className="flex justify-end">
          <button className="text-primary-20 font-semibold hover:underline cursor-pointer">
            Forgot Password?
          </button>
        </div>
      </div>

      <Button
        type="submit"
        label="Login"
        variant="primary"
        classNames="w-full"
      />
      <p className="text-neutral-140 leading-5 mt-2 text-center">
        New to HanjiFinance?{" "}
        <button
          onClick={() => {
            dispatch(setModalType("signup"));
            dispatch(setIsModalOpen(true));
          }}
          type="button"
          className="text-primary-20 font-semibold hover:underline cursor-pointer"
        >
          Signup
        </button>
      </p>
    </form>
  );
};

export default Login;
