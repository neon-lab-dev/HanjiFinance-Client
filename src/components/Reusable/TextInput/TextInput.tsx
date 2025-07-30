/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { IoCheckmark, IoCheckmarkCircle } from "react-icons/io5";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
  isValidField?: boolean; // ✅ success state
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      name,
      placeholder = "",
      type = "text",
      error,
      defaultValue,
      isDisabled = false,
      isRequired = true,
      isValidField = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 font-Montserrat w-full relative">
        {label && (
          <label
            htmlFor={name}
            className="flex flex-row items-center w-full justify-between text-neutral-65"
          >
            <span className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">
              {label}
            </span>
            <span className="text-neutral-85 leading-4 text-[13px] font-medium tracking-[-0.14]">
              {isRequired ? "Required" : "Optional"}
            </span>
          </label>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
          disabled={isDisabled}
          className={`w-full px-4 py-[14px] rounded-lg bg-white border-2 leading-[18px] focus:outline-none transition duration-300 
            ${
              error
                ? "border-red-500"
                : isValidField
                ? "border-green-500"
                : "border-neutral-95 focus:border-neutral-25"
            }`}
          {...rest}
        />

        {/* ✅ Show tick when valid */}
        {isValidField && !error && (
          <IoCheckmark className="absolute top-[36%] right-3 text-success-20 text-base" />
        )}

        {/* ✅ Show error only if not valid */}
        {!isValidField && error?.message && (
          <span className="text-red-500 text-sm">{String(error.message)}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
