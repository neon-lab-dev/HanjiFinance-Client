import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import CourseCard from "./CourseCard";

const Courses = () => {
  const courses = [
    {
      title: "Title for course 1",
      description:
        "Enhance your JavaScript applications with static typing and advanced features",
      image: IMAGES.courseDummyImage,
      duration: "6 weeks",
      lessons: "18 lessons",
      author: "Aman",
      rating: 4.5,
    },
    {
      title: "Title for course 2",
      description:
        "Enhance your JavaScript applications with static typing and advanced features",
      image: IMAGES.courseDummyImage,
      duration: "6 weeks",
      lessons: "18 lessons",
      author: "Aman",
      rating: 4.5,
    },
    {
      title: "Title for course 3",
      description:
        "Enhance your JavaScript applications with static typing and advanced features",
      image: IMAGES.courseDummyImage,
      duration: "6 weeks",
      lessons: "18 lessons",
      author: "Aman",
      rating: 4.5,
    },
  ];
  return (
    <div className="bg-gradient-course pt-[60px] ">
      <Container>
        <SectionTitle heading="Courses That Grow Your Rupee" subHeading="Learn what matters, skip what doesn’t, made for real-world impact"/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 mb-4 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </Container>
       <div className="bg-gradient-course-blur h-[113px] w-full mt-16"></div>
    </div>
  );
};

export default Courses;
