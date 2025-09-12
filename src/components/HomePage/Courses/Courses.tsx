import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import CourseCard from "./CourseCard";
import { useGetAllCoursesQuery } from "../../../redux/Features/Course/courseApi";

const Courses = () => {
 const { data:courses, isLoading } = useGetAllCoursesQuery({ keyword: "", category: "" });
 console.log(courses)
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const blurVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
  };

  // ---- Dummy Data ----
  // const courses = [
  //   {
  //     title: "Full Stack Development",
  //     subTitle: "Beginner to Advanced",
  //     tag: "Best Seller",
  //     description: "Learn full-stack development from scratch.",
  //     image: IMAGES.courseDummyImage,
  //     accordion: {
  //       title: "What will you learn?",
  //       description: [
  //         "React.js fundamentals & advanced concepts",
  //         "Node.js & Express backend development",
  //         "Database integration (MongoDB)",
  //         "Deployment & scaling techniques",
  //       ],
  //     },
  //     price: "9,500",
  //   },
  //   {
  //     title: "UI/UX Design",
  //     subTitle: "Design Stunning Interfaces",
  //     tag: "Trending",
  //     description: "Master modern UI/UX design practices.",
  //     image: IMAGES.courseDummyImage,
  //     accordion: {
  //       title: "What will you learn?",
  //       description: [
  //         "User research & wireframing",
  //         "Prototyping with Figma",
  //         "Design systems & accessibility",
  //         "Handoff to developers",
  //       ],
  //     },
  //     price: "7,000",
  //   },
  //   {
  //     title: "Data Science & ML",
  //     subTitle: "Hands-on Machine Learning",
  //     tag: "New",
  //     description: "Dive into data science with practical projects.",
  //     image: IMAGES.courseDummyImage,
  //     accordion: {
  //       title: "What will you learn?",
  //       description: [
  //         "Python for data analysis",
  //         "Machine learning models",
  //         "Deep learning basics",
  //         "Data visualization & deployment",
  //       ],
  //     },
  //     price: "12,000",
  //   },
  // ];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative bg-gradient-course pt-[60px]  overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <SectionTitle
            heading="Courses That Grow Your Rupee"
            subHeading="Learn what matters, skip what doesn’t, made for real-world impact"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardContainerVariants}
        >
            {courses?.data?.courses?.map((course, index: number) => (
  <motion.div key={index} variants={cardVariants}>
    <CourseCard {...course} />
  </motion.div>
))}

        </motion.div>
      </Container>
      <motion.div
        className=" bg-gradient-course-blur h-[113px] w-full z-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={blurVariants}
      ></motion.div>
    </div>
  );
};

export default Courses;
