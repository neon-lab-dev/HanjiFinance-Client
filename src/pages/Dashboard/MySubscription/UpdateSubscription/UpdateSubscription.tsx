import { useEffect } from "react";
import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";

interface BankFormData {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  bankBranch: string;
}

const UpdateSubscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankFormData>();

  const handleBankUpdate = (data: BankFormData) => {
    console.log("Bank Details:", data);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log("Clicked:", event.target);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <p className="font-bold text-neutral-10">
          Enter details below to update your bank details,
        </p>

        <form
          onSubmit={handleSubmit(handleBankUpdate)}
          className="flex flex-col gap-8 mt-6 w-full"
        >
          {/* Account Holder Name */}
          <TextInput
            label="Account Holder Name"
            placeholder="For e.g., Mohit Naroune"
            error={errors.accountHolderName}
            {...register("accountHolderName", {
              required: "Account Holder Name is required",
            })}
          />

          {/* Account Number */}
          <TextInput
            label="Account Number"
            placeholder="For e.g., xxxx8877"
            error={errors.accountNumber}
            {...register("accountNumber", {
              required: "Account Number is required",
              minLength: { value: 6, message: "Invalid account number" },
            })}
          />

          {/* IFSC Code */}
          <TextInput
            label="IFSC Code"
            placeholder="Enter 11-digit IFSC code for your bank account"
            error={errors.ifscCode}
            {...register("ifscCode", {
              required: "IFSC Code is required",
              minLength: { value: 11, message: "Invalid IFSC code" },
              maxLength: { value: 11, message: "Invalid IFSC code" },
            })}
          />

          {/* Bank Name */}
          <TextInput
            label="Bank Name"
            placeholder="For e.g., State Bank of India"
            error={errors.bankName}
            {...register("bankName", {
              required: "Bank Name is required",
            })}
          />

          {/* Bank Branch */}
          <TextInput
            label="Bank Branch"
            placeholder="Enter the area/location where your bank branch is located"
            error={errors.bankBranch}
            {...register("bankBranch", {
              required: "Bank Branch is required",
            })}
          />

          {/* Actions */}
          <div className="flex gap-8 w-full items-center justify-center">
            <Button
              variant="custom"
              label="Don’t Update"
              classNames="px-8 border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
              type="button"
            />
            <Button variant="primary" label="Update Bank Details" type="submit" />
          </div>
        </form>

        <p className="text-neutral-60 text-center mt-8 font-medium text-[13px] mb-2">
          On successful verification, this account will be used for managing your
          payments on this platform !
        </p>
      </SubscriptionStatus>
    </div>
  );
};

export default UpdateSubscription;
