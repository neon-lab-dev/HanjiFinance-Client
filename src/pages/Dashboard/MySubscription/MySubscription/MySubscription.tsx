import SubscriptionCardsList from "../../../../components/Dashboard/Subscriptions/SubscriptionCardList/SubscriptionCardList";
import SubscriptionDetails from "../../../../components/Dashboard/Subscriptions/SubscriptionDetails/SubscriptionDetails";
import SubscriptionHero from "../../../../components/Dashboard/Subscriptions/SubscriptionHero/SubscriptionHero";
import SubscriptionQuickList from "../../../../components/Dashboard/Subscriptions/SubscriptionQuickList/SubscriptionQuickList";
import Loader from "../../../../components/Shared/Loader/Loader";
import { useGetMySubscriptionQuery } from "../../../../redux/Features/BoardroomBanter/boardroomBanterApi";
import SubscriptionStatus from "../../../SubscriptionStatus/SubscriptionStatus";

const MySubscription = () => {
  const { data, isLoading } = useGetMySubscriptionQuery({});
  return (
    isLoading?
    <div className="h-[80vh] flex items-center justify-center"><Loader/></div>:
    !data?.data?
     <SubscriptionStatus status="no-subscription-boardroom" />
     :
    data?.data?.status === "waitlist" ?
    <SubscriptionStatus status="waitlisted" />
    :
    data?.data?.status === "code sent" ?
    <SubscriptionStatus status="coupon-sent" />
    :
    <div>
      <SubscriptionHero subscription={data?.data} />
      <SubscriptionCardsList status={data?.data?.status} nextBilling={data?.data?.endDate} />
      <div className="flex mt-8 gap-[18px]">
        <div className="w-[40%]">
          <SubscriptionDetails
           data={{
            status: data?.data?.status,
            nextBilling: data?.data?.endDate
          }} />
        </div>
        <div className="w-[60%]">
          <SubscriptionQuickList />
        </div>
      </div>
    </div>
  );
};

export default MySubscription;
