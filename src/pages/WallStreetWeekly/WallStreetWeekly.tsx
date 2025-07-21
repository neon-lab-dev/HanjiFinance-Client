import SubscribeNewsletter from "../../components/WallStreetWeeklyPage/SubscribeNewsletter/SubscribeNewsletter";
import WallStreetWeeklyHero from "../../components/WallStreetWeeklyPage/WallStreetWeeklyHero/WallStreetWeeklyHero";

const WallStreetWeekly = () => {
    return (
        <div >
            <WallStreetWeeklyHero />
            <SubscribeNewsletter/>
            <div className="bg-white pb-10 h-10 w-full"> </div>

        </div>
    );
};

export default WallStreetWeekly;