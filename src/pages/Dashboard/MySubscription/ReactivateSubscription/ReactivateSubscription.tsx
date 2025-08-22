import SubscriptionStatus from "../../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import Button from "../../../../components/Reusable/Button/Button";



const ReactivateSubscription = () => {
  
  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <div className="space-y-6 font-Montserrat"><div>
            <h2 className="mb-4 font-medium">Quick Confirmation</h2>
            <ol className="list-decimal pl-6 space-y-4">
               <li className="text-neutral-10">Upon reactivation of the subscription, i.e., removing the paused status from the current subscription, your monthly billing will start from the current month of reactivation. For example, if you are starting your subscription from 15th September, 2025. Then your monthly bill cycle will start from September, 2025 onwards.</li>
            <li className="text-neutral-10">Auto-Renewal will be applied automatically upon reactivation of the subscription</li>
            </ol>
           
        </div>
        <div className="flex gap-8 w-full items-center justify-center">
            <Button
              variant="custom"
              label="Don’t Reactivate"
              classNames="px-8 border-[1px] border-surface-90 text-neutral-10 bg-surface-30"
              type="button"
            />
            <Button
              variant="primary"
              label="Reactivate Subscription"
              type="submit"
            />
          </div></div>
                <p className="text-neutral-60 text-center mt-8 font-medium text-[13px] mb-2">Can’t wait to see you back in the elite club!</p>

      </SubscriptionStatus>
    </div>
  );
};

export default ReactivateSubscription;
