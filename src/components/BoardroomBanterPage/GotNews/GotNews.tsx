/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
import { useValidateCouponCodeMutation } from "../../../redux/Features/CouponCode/couponCodeApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type FormData = {
  couponCode: string;
};

const GotNews = () => {
  const [validateCouponCode, { isLoading: isValidating }] =
    useValidateCouponCodeMutation();
  const [isCouponValid, setIsCouponValid] = useState<boolean>(false);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const couponCode = watch("couponCode");

  const handleValidate = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code first");
      return;
    }

    try {
      const payload = { code: couponCode };
      const response = await validateCouponCode(payload).unwrap();
      if (response?.success) {
        toast.success("Coupon code is valid 🎉");
        setIsCouponValid(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
      setIsCouponValid(false);
    }
  };

  return (
    <div className="bg-gradient-good-news pt-[60px] font-Montserrat">
      <Container>
        <SectionTitle
          heading="You got the good news?"
          subHeading="Put in your special code & proceed to join"
        />
        <form className="space-y-8 flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row items-top justify-between gap-6 w-[80%] md:w-lg">
            <div className="flex flex-col justify-start items-start w-full gap-2 relative">
              {/* Coupon Input + Validate Button */}
              <div className="relative w-full">
                <TextInput
                  isRequired
                  isValidField={isCouponValid}
                  placeholder="Enter your valid coupon code"
                  error={errors.couponCode}
                  {...register("couponCode", {
                    required: "Coupon code is required",
                  })}
                />

                {!isCouponValid && (
                  <button
                    type="button"
                    onClick={handleValidate}
                    disabled={isValidating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-primary-10 hover:bg-primary-20 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    {isValidating ? "..." : "Validate"}
                  </button>
                )}
              </div>

              {isCouponValid && (
                <span className="text-success-20 text-sm mt-1">
                  Coupon Code is Valid
                </span>
              )}
            </div>

            {/* Proceed button */}
            <Link to={"/payment"}>
              <Button
                label="Proceed to Pay"
                variant={isCouponValid ? "primary" : "disabled"}
                classNames="px-4 py-[14px] h-fit"
                disabled={!isCouponValid}
              />
            </Link>
          </div>
        </form>
      </Container>
      <div className="bg-gradient-good-news-blur h-[100px] w-full"></div>
    </div>
  );
};

export default GotNews;
