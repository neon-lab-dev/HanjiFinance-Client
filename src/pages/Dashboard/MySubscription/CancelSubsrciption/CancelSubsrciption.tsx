/* eslint-disable @typescript-eslint/no-explicit-any */
import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";
import { useForm } from "react-hook-form";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCancelSubscriptionMutation } from "../../../../redux/Features/BoardroomBanter/boardroomBanterApi";

type TFormData = {
  cancelReason?: string;
}

const CancelSubscription = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const [cancelSubscription, { isLoading: isCanceling }] =
    useCancelSubscriptionMutation();

  const handleCancelSubscription = async (data: TFormData) => {
    try {
      const payload = {
        cancelReason: data.cancelReason,
      };
      const response = await cancelSubscription(payload).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        navigate("/dashboard/my-subscriptions");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <p className="font-bold text-neutral-10">It’s sad to see you go,</p>
        <form
          onSubmit={handleSubmit(handleCancelSubscription)}
          className="flex flex-col gap-8 mt-6 w-full"
        >
          {/* Message */}
          <Textarea
            label="Please tell us the reason for your subscription cancellation"
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.cancelReason}
            {...register("cancelReason")}
            isRequired={true}
          />

          {/* Actions */}
          <div className="flex gap-3 w-full items-center justify-center">
            <Link to={"/dashboard/my-subscriptions"}>
              <Button
                variant="custom"
                label="Don’t Cancel"
                classNames="px-8 py-[11px] border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
                type="button"
              />
            </Link>
            <Button
              variant="primary"
              label="Cancel Subscription"
              type="submit"
              isLoading={isCanceling}
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

export default CancelSubscription;
