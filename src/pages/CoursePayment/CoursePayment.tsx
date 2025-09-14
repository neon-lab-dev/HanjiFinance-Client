/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useCourseCheckoutMutation,
  useGetSingleCourseByIdQuery,
} from "../../redux/Features/Course/courseApi";
import Container from "../../components/Reusable/Container/Container";
import PaymentProductsCard from "../../components/Payment/PaymentProductsCard/PaymentProductsCard";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import { useGetRazorpayKeyQuery } from "../../redux/Features/User/userApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import type { TUser } from "../../types/user.types";
import toast from "react-hot-toast";
import { openModal } from "../../redux/Features/Auth/authModalSlice";
import { config } from "../../config/config";

const CoursePayment = () => {
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser) as TUser;
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, isError } = useGetSingleCourseByIdQuery(id);

  const courseData = {
    price: course?.data?.discountedPrice,
    quantity: 1,
  };

  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [checkout] = useCourseCheckoutMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const itemTotal = course?.data?.discountedPrice;
  const gstAmount = +(itemTotal * (18 / 100)).toFixed(2);
  const totalToPay = +(itemTotal + gstAmount).toFixed(2);
  const handlePurchaseCourse = async () => {
    if (!user) {
      toast.error("Please login to proceed");
      dispatch(openModal("login"));
      return;
    }

    setLoading(true);

    const payload = {
      amount: totalToPay,
    };

    let response;
    try {
      response = await checkout(payload).unwrap();
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    try {
      const options = {
        key: apiKey?.key,
        amount: response?.data?.amount,
        currency: "INR",
        name: "Hanjifinance",
        description: "Test Transaction",
        image: config.razorpayLogo,
        order_id: response?.data?.id,
        callback_url: `${config.baseUrl}/course-order/verify-payment`,
        prefill: {
          name: user?.name,
          email: user?.email,
          userId: user?._id,
        },
        theme: { color: "#A7701A" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      const courseOrderData = {
        courseId: course?.data?._id,
        totalAmount: course?.data?.discountedPrice,
      };

      localStorage.setItem("courseOrderData", JSON.stringify(courseOrderData));
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !course?.data) return <p>Something went wrong!</p>;

  return (
    <div className="font-Montserrat py-5 md:py-10 bg-surface-30">
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Course Payment
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
          <PaymentProductsCard item={course?.data} />
          <PaymentCard
            items={[courseData]}
            gstRate={18}
            onProceed={handlePurchaseCourse}
            isLoading={loading}
          />
        </div>
      </Container>
    </div>
  );
};

export default CoursePayment;
