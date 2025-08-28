import SubscriptionCardsList from '../../../../components/Dashboard/Subscriptions/SubscriptionCardList/SubscriptionCardList'
import SubscriptionDetails, { type SubscriptionData } from '../../../../components/Dashboard/Subscriptions/SubscriptionDetails/SubscriptionDetails'
import SubscriptionHero from '../../../../components/Dashboard/Subscriptions/SubscriptionHero/SubscriptionHero'
import SubscriptionQuickList from '../../../../components/Dashboard/Subscriptions/SubscriptionQuickList/SubscriptionQuickList'

const MySubscription = () => {
  const subscriptionData: SubscriptionData = {
  plan: "Premium Chat Access",
  status: "Paused",
  monthlyFee: "₹690",
  nextBillingDate: null,
  autoRenewal: false,
}
  return (
    <div>
      <SubscriptionHero/>
      <SubscriptionCardsList/>
      <div className='flex mt-8 gap-[18px]'>
        <div className='w-[40%]'>
         <SubscriptionDetails data={subscriptionData}/>
        </div>
         <div className='w-[60%]'>
       <SubscriptionQuickList/>
        </div>

      </div>
    </div>
  )
}

export default MySubscription