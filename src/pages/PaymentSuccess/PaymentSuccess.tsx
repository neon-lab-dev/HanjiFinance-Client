import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../assets";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="bg-surface-30 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="size-11 rounded-full bg-[#16A34A] flex items-center justify-center">
          <img src={ICONS.tickMark} alt="Success" className="size-6" />
        </div>
        <h1 className="text-neutral-10 text-[28px] font-medium leading-8 mt-4 text-center">
          Payment Successful!
        </h1>
        <p className="text-neutral-10 text-[15px] font-medium leading-[18px] mt-8 text-center">
          You will receive an email shortly, regarding the joining link of the Boardroom Banter WhatsApp group!
        </p>
        <p className="text-neutral-10 text-[15px] leading-[18px] mt-4 text-center">
          You will be redirected to the home page in {counter} second{counter !== 1 && "s"}...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
