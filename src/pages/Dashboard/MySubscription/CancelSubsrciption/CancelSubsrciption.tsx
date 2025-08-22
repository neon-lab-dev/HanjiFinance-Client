import { useEffect } from "react";
import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";
import { useForm } from "react-hook-form";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import ConfermationCard from "../../../../components/Dashboard/SharedComponents/ConfermationCard/ConfermationCard";

interface PauseFormData {
  message?: string;
}

const CancelSubscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PauseFormData>();

  const handlePause = (data: PauseFormData) => {
    console.log("Form Data:", data);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log("Clicked:", event.target);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <p className="font-bold text-neutral-10">It’s sad to see you go,</p>
        <form
          onSubmit={handleSubmit(handlePause)}
          className="flex flex-col gap-8 mt-6 w-full"
        >   

          {/* Message */}
             <Textarea
            label="Please tell us the reason for your subscription cancellation"
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.message}
            {...register("message")}
            isRequired={true}
          />

          {/* Actions */}
          <div className="flex gap-8 w-full items-center justify-center">
            <Button
              variant="custom"
              label="Don’t Cancel"
              classNames="px-8 border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
              type="button"
            />
            <Button
              variant="primary"
              label="Cancel Subscription"
              type="submit"
            />
          </div>
        </form>
        <p className="text-neutral-60 text-center mt-8 font-medium text-[13px] mb-2">Hope to see you back super soon!</p>
      </SubscriptionStatus>
    </div>
  );
};

export default CancelSubscription;
