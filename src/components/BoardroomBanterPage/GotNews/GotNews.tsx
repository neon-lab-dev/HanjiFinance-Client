import { useForm } from "react-hook-form";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";

type FormData = {
  couponCode: string;
};

const GotNews = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" }); // validate on change

  const couponCode = watch("couponCode"); // watch input value

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const isCouponValid = couponCode && !errors.couponCode; // check validity

  return (
    <div className="bg-gradient-good-news pt-[60px] font-Montserrat">
      <Container>
        <SectionTitle
          heading="You got the good news?"
          subHeading="Put in your special code & proceed to join"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center w-full"
        >
          <div className="flex flex-col md:flex-row items-top justify-between gap-6 w-[80%] md:w-lg">
            <div className="flex flex-col justify-start items-start w-full  gap-2">
              <TextInput
                isRequired
                isValidField={isCouponValid || false}
                placeholder="Enter your valid coupon code"
                error={errors.couponCode}
                {...register("couponCode", {
                  required: "Coupon code is required",
                  minLength: {
                    value: 5,
                    message: "Coupon code must be at least 5 characters",
                  },
                })}
              />
              {isValid && (
                <span className="text-success-20 text-sm mt-1">
                  Coupon Code is Correct
                </span>
              )}
            </div>

            <Button
              type="submit"
              label="Proceed"
              variant={isCouponValid ? "primary" : "disabled"}
              classNames="px-4 py-[14px] h-fit"
              disabled={!isCouponValid} // disable if not valid
            />
          </div>
        </form>
      </Container>
      <div className="bg-gradient-good-news-blur h-[100px] w-full"></div>
    </div>
  );
};

export default GotNews;
