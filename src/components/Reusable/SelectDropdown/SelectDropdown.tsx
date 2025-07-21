/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";


interface DropdownProps {
  label: string;
  options: string[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  isRequired?: boolean;
  selected?: boolean;
}

const SelectDropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, error, isRequired=true, selected, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-Montserrat w-full">
        <label
            className="flex flex-row items-center w-full justify-between text-neutral-65"
          >
            <span className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">
              {label}
            </span>
            <span>
                <span className="text-neutral-85 leading-4 text-[13px] font-medium tracking-[-0.14]">
                  {" "}
                 {isRequired ? "Required" : "Optional"}
                </span>
            </span>
          </label>
        <select
          ref={ref}
          defaultChecked={selected}
          required={isRequired}
          className={`w-full px-4 py-[14px] rounded-lg bg-white border-2 leading-[18px] focus:outline-none focus:border-neutral-25 transition duration-300 ${
            error ? "border-red-500" : "border-neutral-95"
          }`}
          {...rest}
        >
          <option value="" disabled selected>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && typeof error.message === 'string' && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
      </div>
    );
  }
);

SelectDropdown.displayName = "SelectDropdown";

export default SelectDropdown;
