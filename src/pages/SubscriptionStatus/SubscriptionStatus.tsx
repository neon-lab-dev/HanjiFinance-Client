import { FiCreditCard, FiClock, FiMail } from "react-icons/fi";

type TSubscriptionStatusProps = {
  status: "no-subscription" | "waitlisted" | "coupon-sent";
};

const SubscriptionStatus: React.FC<TSubscriptionStatusProps> = ({ status }) => {
  let icon, title, description;

  switch (status) {
    case "no-subscription":
      icon = <FiCreditCard className="text-5xl text-red-500 mb-4" />;
      title = "No Subscription Purchased Yet";
      description =
        "You haven’t purchased any subscription plan yet. Choose a plan to unlock premium features.";
      break;

    case "waitlisted":
      icon = <FiClock className="text-5xl text-yellow-500 mb-4" />;
      title = "You Are Waitlisted";
      description =
        "Thank you for your interest. You’re currently waitlisted. Shortly, we will send you a coupon code by email.";
      break;

    case "coupon-sent":
      icon = <FiMail className="text-5xl text-green-500 mb-4" />;
      title = "Coupon Code Sent to Your Email";
      description =
        "We’ve sent a coupon code to your email. Apply it at checkout to continue your payment with a discount.";
      break;

    default:
      icon = <FiCreditCard className="text-5xl text-gray-400 mb-4" />;
      title = "Unknown Status";
      description = "Please check again or contact support.";
  }

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      {icon}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 max-w-md">{description}</p>
    </div>
  );
};

export default SubscriptionStatus;
