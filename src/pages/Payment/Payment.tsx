import { useDispatch, useSelector } from "react-redux";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import PaymentProductsCard from "../../components/Payment/PaymentProductsCard/PaymentProductsCard";
import Container from "../../components/Reusable/Container/Container";
import { useGetRazorpayKeyQuery } from "../../redux/Features/User/userApi";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import type { TUser } from "../../types/user.types";
import { useState } from "react";
import { useCreateSubscriptionMutation } from "../../redux/Features/BoardroomBanter/boardroomBanterApi";
import toast from "react-hot-toast";
import { openModal } from "../../redux/Features/Auth/authModalSlice";
import { config } from "../../config/config";

const Payment = () => {
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser) as TUser;
  const data = {
    price: 1000,
    title: "Boardroom Banter",
    subtitle: "Connect with our group",
    quantity: 1,
    basePrice: "1000/month",
  };

  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [createSubscription] = useCreateSubscriptionMutation();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please login to proceed");
      dispatch(openModal("login"));
      return;
    }

    setLoading(true);

    try {
      const response = await createSubscription({}).unwrap();
      const subscriptionId = response?.data?.razorpaySubscriptionId;

      const options = {
        key: apiKey?.key,
        subscription_id: subscriptionId,
        name: "Hanjifinance",
        description: "Boardroom Banter Membership",
        image: config.razorpayLogo,
        callback_url: `${config.baseUrl}/boardroom-banter-subscription/verify-payment`,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneNumber,
        },
        theme: { color: "#03b13a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-30">
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Course Payment
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
          <PaymentProductsCard item={data} />
          <PaymentCard
            items={[data]}
            gstRate={18}
            isAutopayAvailable={false}
            showAutopayOption={false}
            onProceed={handleSubscribe}
            isLoading={loading}
          />
        </div>
      </Container>
    </div>
  );
};

export default Payment;
