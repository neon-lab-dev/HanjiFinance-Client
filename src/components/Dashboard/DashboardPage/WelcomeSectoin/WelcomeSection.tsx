import { IMAGES } from "../../../../assets"

const WelcomeSection = () => {
  return (
    <div className="relative w-full h-fit flex rounded-2xl bg-surface-80 p-6 overflow-hidden font-Montserrat">
      <div className="absolute right-0 top-0 bottom-0 rounded-r-2xl h-full">
        <img src={IMAGES.dashboardLines} className="h-full"/>
      </div>
      <div className="space-y-1 text-white flex flex-col justify-center">
        <h2 className="text-2xl font-medium"> 
          Welcome back, Mohit!
        </h2>
        <p className="leading-[22px]">Here's what's happening with your account today</p>
      </div>
    </div>
  ) 
}

export default WelcomeSection