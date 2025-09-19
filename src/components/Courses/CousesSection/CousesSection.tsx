import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IMAGES } from "../../../assets";
import SectionTitle from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";
import CourseCard from "../../HomePage/Courses/CourseCard";
import { useGetAllCoursesQuery } from "../../../redux/Features/Course/courseApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TUser } from "../../../types/user.types";
import { useGetMyCourseOrdersQuery } from "../../../redux/Features/CourseOrders/courseOrdersApi";
const CousesSection = () => {
  const user = useSelector(useCurrentUser) as TUser;
  const { data: myCourses, isLoading: isMyCoursesLoading } = useGetMyCourseOrdersQuery({}, { skip: !user });
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
const { data:courses, isLoading } = useGetAllCoursesQuery({ keyword: "", });
console.log(myCourses)

 
if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div id="explore-courses" className="relative  bg-gradient-courses-section-bg pt-[60px] font-Montserrat overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <SectionTitle
            heading="Premium Finance Courses"
            subHeading="Each course covers a vital financial pillar. Together, they form the complete toolkit you need"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardContainerVariants}
        >
           {courses?.data?.courses?.map((course, index) => {
            const isEnrolled = myCourses?.data?.orders?.some(
              (order: any) => order.courseId._id === course._id 
            );
            return (
              <motion.div key={index} variants={cardVariants}>
                <CourseCard {...course} isEnrolled={isEnrolled} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
      <motion.div
        className="bg-gradient-courses-section h-[113px] w-full z-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={blurVariants}
      ></motion.div>
    </div>
  );
};

export default CousesSection;
