import { useGetRazorpayKeyQuery } from "../../redux/Features/User/userApi";
import { useCheckoutMutation } from "../../redux/Features/ChatAndChill/chatAndChillApi";
import { config } from "../../config/config";
import Container from "../../components/Reusable/Container/Container";
import PaymentProductsCard from "../../components/Payment/PaymentProductsCard/PaymentProductsCard";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import type { TUser } from "../../types/user.types";
import { useState } from "react";
import toast from "react-hot-toast";

const ChatAndChillPayment = () => {
  const taxValue = 179.82;
  const data = {
    price: 999,
    title: "Chat & Chill",
    subtitle: "Book 1 on 1 call",
    quantity: 1,
    basePrice: "999",
  };
  const user = useSelector(useCurrentUser) as TUser;

  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [checkout] = useCheckoutMutation();
  const [loading, setLoading] = useState(false);

  const handleBookChatAndChill = async () => {
    if (!user) {
      toast.error("Please login to proceed");
      return;
    }

    setLoading(true);

    const total = data.price + taxValue;

    try {
      const response = await checkout({ amount: total }).unwrap();

      const options = {
        key: apiKey?.key,
        amount: response?.data?.amount,
        currency: "INR",
        name: "Hanjifinance",
        description: "Chat & Chill Booking",
        image: config.razorpayLogo,
        order_id: response?.data?.id,
        callback_url: `${config.baseUrl}/chat-and-chill/verify-payment`,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneNumber,
        },
        theme: { color: "#b91c1c" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-30">
      <Container>
        <div className="space-y-8 pt-5">
          <div className="flex justify-between items-center pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Book Consultation
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
            onProceed={handleBookChatAndChill}
            isLoading={loading}
          />
        </div>
      </Container>
    </div>
  );
};


export default ChatAndChillPayment;
