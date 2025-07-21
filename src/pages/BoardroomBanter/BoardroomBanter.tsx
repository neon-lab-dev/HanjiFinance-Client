import Faq from "../../components/Shared/Faq/Faq";
import BoardroomHero from "../../components/BoardroomBanterPage/Hero/BoardRoomHero";
import GotNews from "../../components/BoardroomBanterPage/GotNews/GotNews";
import JoinWaitlist from "../../components/BoardroomBanterPage/JoinWaitlist/JoinWaitlist";

const BoardroomBanter = () => {
  return (
    <div>
      <BoardroomHero />
      <JoinWaitlist/>
      <GotNews />
      <Faq />
    </div>
  );
};

export default BoardroomBanter;
