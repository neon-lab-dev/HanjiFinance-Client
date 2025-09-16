import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICONS } from "../../assets";
import { useBookChatAndChillMutation } from "../../redux/Features/ChatAndChill/chatAndChillApi";
import Loader from "../../components/Shared/Loader/Loader";
import { useCreateCourseOrderMutation } from "../../redux/Features/Course/courseApi";
import { useCreateProductOrderMutation } from "../../redux/Features/ProductOrders/productOrdersApi";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/Features/Cart/cartSlice";
import { persistor } from "../../redux/store";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const type = params.get("type");
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  const [counter, setCounter] = useState<number | null>(null);

  const [bookChatAndChill, { isLoading: isBooking }] =
    useBookChatAndChillMutation(); // for chat and chill booking
  const [createCourseOrder, { isLoading: isPlacingOrder }] =
    useCreateCourseOrderMutation(); // for course order placing
  const [createProductOrder, { isLoading: isPlacingProductOrder }] =
    useCreateProductOrderMutation(); // for course order placing

  // trigger redirect countdown once counter starts
  useEffect(() => {
    if (counter === null) return;

    const interval = setInterval(() => {
      setCounter((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, counter * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [counter, navigate]);

  const hasRun = useRef(false);

  useEffect(() => {
    if (!type || hasRun.current) return;
    hasRun.current = true;

    const chatAndChillData = localStorage.getItem("chatAndChillData");
    const courseOrderData = localStorage.getItem("courseOrderData");
    const productOrderData = localStorage.getItem("productOrderData");

    const handlePayment = async () => {
      try {
        switch (type) {
          case "chatAndChill": {
            if (chatAndChillData) {
              const parsedData = JSON.parse(chatAndChillData);

              const response = await bookChatAndChill(parsedData).unwrap();
              if (response?.success) {
                setCounter(10);
                localStorage.removeItem("chatAndChillData");
                navigate("/dashboard/consultations");
              }
            }
            break;
          }

          case "boardroomBanter": {
            setCounter(10);
            navigate("/dashboard/my-subscriptions");
            break;
          }

          case "course":
            if (courseOrderData) {
              const parsedData = JSON.parse(courseOrderData);

              const response = await createCourseOrder(parsedData).unwrap();
              if (response?.success) {
                setCounter(10);
                localStorage.removeItem("courseOrderData");
                navigate("/dashboard/my-courses");
              }
            }
            break;

          case "product":
            if (productOrderData) {
              const parsedData = JSON.parse(productOrderData);

              const response = await createProductOrder(parsedData).unwrap();
              if (response?.success) {
                setCounter(10);
                localStorage.removeItem("productOrderData");
                dispatch(clearCart());
                persistor.flush();
                navigate("/dashboard/my-orders");
              }
            }
            break;

          default:
            console.error("Unknown payment type:", type);
        }
      } catch (err) {
        console.error("Payment finalization failed:", err);
      }
    };

    handlePayment();
  }, [type, orderId, dispatch]);

  const descriptions: Record<string, string> = {
    chatAndChill:
      "You have successfully booked your Chat and Chill session. You will receive an email with further details shortly!",
    boardroomBanter:
      "You will receive an email shortly regarding the joining link of the Boardroom Banter WhatsApp group!",
    course:
      "Your course order has been successfully placed. You can continue learning from the dashboard!",
    product:
      "Your product order has been successfully placed. You can track your order status from the dashboard!",
  };

  return (
    <div className="bg-surface-30 flex items-center justify-center min-h-screen">
      {isBooking || isPlacingOrder || isPlacingProductOrder ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <div className="size-11 rounded-full bg-[#16A34A] flex items-center justify-center">
            <img src={ICONS.tickMark} alt="Success" className="size-6" />
          </div>
          <h1 className="text-neutral-10 text-[28px] font-medium leading-8 mt-4 text-center">
            Payment Successful!
          </h1>
          <p className="text-neutral-10 text-[15px] font-medium leading-[18px] mt-8 text-center">
            {descriptions[type ?? ""] ||
              "Payment is successful! Please continue to the dashboard."}
          </p>

          {counter !== null && (
            <p className="text-neutral-10 text-[15px] leading-[18px] mt-4 text-center">
              You will be redirected to the home page in {counter} second
              {counter !== 1 && "s"}...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
