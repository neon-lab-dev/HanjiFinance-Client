import Faq from "../../components/Shared/Faq/Faq";
import GotNews from "../../components/BoardroomBanterPage/GotNews/GotNews";
import JoinWaitlist from "../../components/BoardroomBanterPage/JoinWaitlist/JoinWaitlist";
import BoardRoomHero from "../../components/BoardroomBanterPage/Hero/BoardRoomHero";

const BoardroomBanter = () => {
  return (
    <div>
      <BoardRoomHero />
      <JoinWaitlist/>
      <GotNews />
      <Faq />
    </div>
  );
};

export default BoardroomBanter;
