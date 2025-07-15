import AboutUs from "../../components/HomePage/AboutUs/AboutUs";
import Courses from "../../components/HomePage/Courses/Courses";
import Hero from "../../components/HomePage/Hero/Hero";
import Faq from "../../components/Shared/Faq/Faq";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Courses/>
      <Faq/>
    </div>
  );
};

export default Home;
