
import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import { ICONS } from "../../../../assets";
import TwoMonthsCalender from "../../../../components/Reusable/Calender/TwoMonthsCalender";
import { useState } from "react";

interface PauseFormData {
  dateRange: string;
  message?: string;
}

const PauseSubscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // 🔑 from react-hook-form
  } = useForm<PauseFormData>();

  const handlePause = (data: PauseFormData) => {
    console.log("Form Data:", data);
  };

  const [showCalender, setShowCalender] = useState(false);

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <form
          onSubmit={handleSubmit(handlePause)}
          className="flex flex-col gap-8 mt-6 w-full"
        >
          {/* Date Range */}
          <div className="relative w-full">
            <TextInput
              label="Date Range"
              placeholder="Choose a date range until which subscription has to be paused"
              error={errors.dateRange}
              {...register("dateRange", {
                required: "Date range is required",
              })}
              icon={ICONS.calendarMinimalistic}
              onClickIcon={() => setShowCalender(!showCalender)}
              
            />
            {showCalender && (
              <div className="absolute z-10 mt-2">
                <TwoMonthsCalender
                  onChange={(range) => {
                    if (range.start && range.end) {
                      // format dd/MM/yyyy - dd/MM/yyyy
                      const formatted = `${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`;
                      setValue("dateRange", formatted, { shouldValidate: true });
                     
                    }
                  }}
                  onClickApply={()=> setShowCalender(false)}
                />
              </div>
            )}
          </div>

          {/* Message */}
          <Textarea
            label="Please tell us the reason for your subscription pause"
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
              label="Don’t Pause"
              classNames="px-8 border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
              type="button"
            />
            <Button variant="primary" label="Pause Subscription" type="submit" />
          </div>
        </form>

        <p className="text-neutral-60 text-center mt-8 font-medium text-[13px] mb-2">
          Hope to see you back super soon!
        </p>
      </SubscriptionStatus>
    </div>
  );
};

export default PauseSubscription;
