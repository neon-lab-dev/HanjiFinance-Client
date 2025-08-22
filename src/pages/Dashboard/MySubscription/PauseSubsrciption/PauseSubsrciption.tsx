import { useEffect } from "react";
import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import { ICONS } from "../../../../assets";

interface PauseFormData {
  dateRange: string;
  message?: string;
}

const PauseSubscription = () => {
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
    <div>
      <SubscriptionStatus>
        <form
          onSubmit={handleSubmit(handlePause)}
          className="flex flex-col gap-8 mt-6 w-full"
        >
          {/* Date Range */}
          <TextInput
            label="Date Range"
            placeholder="Choose a date range until which subscription has to be paused"
            error={errors.dateRange}
            {...register("dateRange", {
              required: "Date range is required",
            })}
            icon={ICONS.calendarMinimalistic}
          />

          {/* Message */}
             <Textarea
            label="Please tell us the reason for your subscription pause "
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.message}
            {...register("message")}
            isRequired={false}
          />

          {/* Actions */}
          <div className="flex gap-8 w-full items-center justify-center">
            <Button
              variant="custom"
              label="Don’t Pause"
              classNames="px-8 border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
              type="button"
            />
            <Button
              variant="primary"
              label="Pause Subscription"
              type="submit"
            />
          </div>
        </form>
      </SubscriptionStatus>
    </div>
  );
};

export default PauseSubscription;
