import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";

type TFormValues = {
  age: string;
  income: string;
  liabilities: string;
  holdings: string;
  financialGoals: string;
  goalDate: string;
  marketVolatility: string;
};

const FinancialCheakupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const handleCheckup1 = (data: TFormValues) => {
    console.log(data);
  };
  return (
    <div className="rounded-[20px] bg-white border border-neutral-98 font-Montserrat mt-12 px-6 py-8">
      <h1 className="text-neutral-20 text-lg font-semibold leading-5">
        Apply for Access
      </h1>
      <p className="text-neutral-20 text-sm leading-5 mt-2">
        KYC details are mandatory to be filled in this form. It is a regulatory
        compliance mandated as per the SEBI guidelines
      </p>
      <form
        onSubmit={handleSubmit(handleCheckup1)}
        className="flex flex-col items-center justify-center gap-8 w-full mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <TextInput
            label="Age"
            placeholder="E.g., 22"
            error={errors.age}
            {...register("age", {
              required: "Age is required",
            })}
          />

          <TextInput
            label="Income"
            placeholder="₹ enter your monthly income"
            error={errors.income}
            {...register("income", {
              required: "Income is required",
            })}
          />

          <TextInput
            label="Liabilities"
            placeholder="Enter any non returning profit investments (like car, if it's not a taxi)"
            error={errors.liabilities}
            {...register("liabilities", {
              required: "Liabilities are required",
            })}
          />

          <TextInput
            label="Existing MF/stock/FD/crypto holdings"
            placeholder="Enter the value in case you have, else enter NA"
            error={errors.holdings}
            {...register("holdings", {
              required: "This field is required",
            })}
          />

          <TextInput
            label="Financial Goals"
            placeholder="for e.g., high investment tool like looking to buy a property, etc"
            error={errors.financialGoals}
            {...register("financialGoals", {
              required: "Financial Goals are required",
            })}
          />

          <TextInput
            label="Date"
            placeholder="Date by which you would like to achieve the financial goal"
            error={errors.goalDate}
            {...register("goalDate", {
              required: "Date is required",
            })}
          />

          <TextInput
            label="Are you comfortable with market volatility?"
            placeholder="For e.g., Yes or No"
            error={errors.marketVolatility}
            {...register("marketVolatility", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            label="Proceed with paying ₹ 1,999 "
            classNames="w-full sm:w-fit"
          />
        </div>
      </form>
    </div>
  );
};

export default FinancialCheakupForm;
