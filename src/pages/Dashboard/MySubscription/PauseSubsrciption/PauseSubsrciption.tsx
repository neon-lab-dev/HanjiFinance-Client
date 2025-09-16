/* eslint-disable @typescript-eslint/no-explicit-any */

import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import { ICONS } from "../../../../assets";
import TwoMonthsCalender from "../../../../components/Reusable/Calender/TwoMonthsCalender";
import { useState } from "react";
import { usePauseSubscriptionMutation } from "../../../../redux/Features/BoardroomBanter/boardroomBanterApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

type TFormData = {
  dateRange: string;
  pauseReason?: string;
}

const PauseSubscription = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TFormData>();

  const [pauseSubscription, { isLoading: isPausing }] =
    usePauseSubscriptionMutation();

  const handlePauseSubscription = async (data: TFormData) => {
    try {
      const payload = {
        dateRange: data.dateRange,
        pauseReason: data.pauseReason,
      };
      const response = await pauseSubscription(payload).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        navigate("/dashboard/my-subscriptions");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  const [showCalender, setShowCalender] = useState(false);

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <form
          onSubmit={handleSubmit(handlePauseSubscription)}
          className="flex flex-col gap-8 w-full"
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
                      setValue("dateRange", formatted, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  onClickApply={() => setShowCalender(false)}
                />
              </div>
            )}
          </div>

          {/* Message */}
          <Textarea
            label="Please tell us the reason for your subscription pause"
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.pauseReason}
            {...register("pauseReason")}
            isRequired={true}
          />

          {/* Actions */}
          <div className="flex gap-3 w-full items-center justify-center">
            <Link to={"/dashboard/my-subscriptions"}>
              <Button
                variant="custom"
                label="Don’t Pause"
                classNames="py-[11px] px-8 border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
                type="button"
              />
            </Link>
            <Button
              variant="primary"
              label="Pause Subscription"
              type="submit"
              isLoading={isPausing}
            />
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
