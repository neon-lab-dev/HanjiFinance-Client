import SubscriptionCardsList from "../../../../components/Dashboard/Subscriptions/SubscriptionCardList/SubscriptionCardList";
import SubscriptionDetails from "../../../../components/Dashboard/Subscriptions/SubscriptionDetails/SubscriptionDetails";
import SubscriptionHero from "../../../../components/Dashboard/Subscriptions/SubscriptionHero/SubscriptionHero";
import SubscriptionQuickList from "../../../../components/Dashboard/Subscriptions/SubscriptionQuickList/SubscriptionQuickList";
import { useGetMySubscriptionQuery } from "../../../../redux/Features/BoardroomBanter/boardroomBanterApi";

const MySubscription = () => {
  const { data } = useGetMySubscriptionQuery({});
  console.log(data);
  return (
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
