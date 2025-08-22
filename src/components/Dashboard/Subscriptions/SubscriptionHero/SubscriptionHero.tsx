import  { useState } from 'react'
import { IMAGES } from '../../../../assets'

const SubscriptionHero = () => {
  const [subscriptionStatus, setSubscriptionStatus]=useState<"Active Subscription"|"Subscription Paused "|"Subscription Inactive">("Active Subscription")
 
  return (
   <div className="relative w-full h-fit flex rounded-2xl bg-gradient-dashboard-card p-6 overflow-hidden font-Montserrat">
         <div className="absolute -right-2 top-0 bottom-0 rounded-r-2xl h-full">
           <img src={IMAGES.dashboardLines} className="h-full opacity-20"/>
         </div>
         <div className='flex items-stretch justify-between w-full'>
          <div className="space-y-6 text-white flex flex-col justify-center w-full">
          <div className='space-y-1'>
              <h2 className="text-2xl font-medium"> 
             Welcome back, Mohit!
           </h2>
           <p className='text-neutral-165'> Premium Chat Subscription <span className='px-4'>|</span> Active since 12 July, 2025<span className='px-4'>|</span> ₹690/month</p>
          </div>
         
           <p className="leading-[22px] tet-sm text-neutral-100">Continue enjoying your premium subscription for private Whatsapp group with selected elite like minded people!  </p>
         </div>
          <div className={`${subscriptionStatus=="Active Subscription"? " border-success-25 bg-surface-5 text-success-20":" border-primary-35 bg-primary-30 text-primary-15"} border-[1px] rounded-sm p-1 text-[13px] leading-4 font-medium w-fit text-nowrap h-fit`}>
        {subscriptionStatus}
      </div>
         </div>
         
       </div>
  )
}

export default SubscriptionHero