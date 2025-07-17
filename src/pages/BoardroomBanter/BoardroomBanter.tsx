import Faq from '../../components/Shared/Faq/Faq';
import BoardroomHero from '../../components/BoardroomBanterPage/Hero/BoardRoomHero';
import GotNews from '../../components/BoardroomBanterPage/GotNews/GotNews';

const BoardroomBanter = () => {
 return (
    <div>
      <BoardroomHero />
      {/* <AboutUs /> */}
      <GotNews/>
      <Faq/>
    </div>
  );
}

export default BoardroomBanter