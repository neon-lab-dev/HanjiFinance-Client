import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import CourseCard from "./CourseCard";

const Courses = () => {
  // const accordionData = [
  // {
  //   title: "What will I learn?",
  //   description: "You will learn full-stack development with React & Node.js.",
  // },
// ];
  // const courses = [
  //   {
  //       title="Full Stack Development",
  //       subTitle="Beginner to Advanced",
  //       tag="Best Seller",
  //       accordion={accordionData},]
  //     image: IMAGES.courseDummyImage,
     
  //   },
  //   {
  //     title: "Title for course 2",
  //     description:
  //       "Enhance your JavaScript applications with static typing and advanced features",
  //     image: IMAGES.courseDummyImage,
  //     duration: "6 weeks",
  //     lessons: "18 lessons",
  //     author: "Aman",
  //     rating: 4.5,
  //   },
  //   {
  //     title: "Title for course 3",
  //     description:
  //       "Enhance your JavaScript applications with static typing and advanced features",
  //     image: IMAGES.courseDummyImage,
  //     duration: "6 weeks",
  //     lessons: "18 lessons",
  //     author: "Aman",
  //     rating: 4.5,
  //   },
  // ];

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

  return (
    <div className="bg-gradient-course pt-[60px] overflow-hidden">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 mb-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardContainerVariants}
        >
          {/* {courses.map((course, index) => ( */}
            <motion.div 
            // key={index}
             variants={cardVariants}>
              {/* <CourseCard {...course} /> */}
              
      <CourseCard
  title="Full Stack Development"
  subTitle="Beginner to Advanced"
  tag="Best Seller"
  description="Learn full-stack development from scratch."
  image={IMAGES.courseDummyImage}
  accordion={{
    title: "What will you learn?",
    description: [
      "React.js fundamentals & advanced concepts",
      "Node.js & Express backend development",
      "Database integration (MongoDB)",
      "Deployment & scaling techniques"
    ]
  }}
  price="9,500"
/>

            </motion.div>
          {/* ))} */}
        </motion.div>
      </Container>
      <motion.div
        className="bg-gradient-course-blur h-[113px] w-full mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={blurVariants}
      ></motion.div>
    </div>
  );
};

export default Courses;
