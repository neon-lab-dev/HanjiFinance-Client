import React from "react";
import Button from "../../Reusable/Button/Button";
import { useNavigate } from "react-router-dom";

interface PaymentCancellationFormProps {
  setIsConfirmationModalOpen: (isOpen: boolean) => void;
}

const PaymentCancellationForm: React.FC<PaymentCancellationFormProps> = ({
  setIsConfirmationModalOpen,
}) => {
  const navigate = useNavigate();
  const cancelPayment = () => {
    navigate("/payment-cancelled");
  };
  return (
    <div>
      <p className="text-neutral-25 font-medium leading-5 text-center p-6">
        Are you sure you want to cancel your payment?
      </p>
      <hr className="border border-neutral-99 h-[1px] w-full" />
      <div className="p-6 flex items-center justify-center gap-4">
        <Button
          type="submit"
          label="Yes, Cancel"
          variant="tertiary"
          classNames="w-full"
          onClick={cancelPayment}
        />
        <Button
          type="submit"
          label="No, Don’t cancel"
          variant="primary"
          classNames="w-full"
          onClick={() => {
            setIsConfirmationModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default PaymentCancellationForm;
