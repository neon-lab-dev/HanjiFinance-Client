/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardContainer from "../../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaSadTear,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Button from "../../../../components/Reusable/Button/Button";

const ResultPage = () => {
  const location = useLocation();
  const score = location.state.score || 0;
  const passed = location.state.passed || false;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants: any = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  const scoreVariants: any = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "anticipate",
      },
    },
  };

  return (
    <div>
      <DashboardContainer>
        <motion.div
          className="min-h-[80vh] flex items-center justify-center p-4 font-Montserrat"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <motion.div
              className={`${
                passed
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
              } p-8 text-white text-center relative overflow-hidden`}
              variants={itemVariants}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.05, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="relative z-10"
              >
                <AnimatePresence mode="wait">
                  {passed ? (
                    <motion.div
                      key="trophy"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <FaTrophy className="text-6xl mx-auto mb-4 drop-shadow-lg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sad"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <FaSadTear className="text-6xl mx-auto mb-4 drop-shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.h1
                className="text-3xl font-bold mb-2 drop-shadow-lg"
                variants={itemVariants}
              >
                {passed ? "Congratulations!" : "Keep Trying!"}
              </motion.h1>

              <motion.div
                className="flex justify-center items-center gap-2"
                variants={itemVariants}
              >
                {passed ? (
                  <FaCheckCircle className="text-xl" />
                ) : (
                  <FaTimesCircle className="text-xl" />
                )}
                <p className="text-lg font-medium">
                  You {passed ? "Passed" : "Failed"} the Exam
                </p>
              </motion.div>
            </motion.div>

            {/* Score Section */}
            <motion.div className="p-8" variants={itemVariants}>
              {/* Score Circle */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-6"
                variants={scoreVariants}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-3xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    {score}
                  </motion.span>
                  <motion.span
                    className=""
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    Score
                  </motion.span>
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="flex items-center justify-center"
                variants={itemVariants}
              >
                <Link to={"/dashboard/my-courses"}>
                  <Button variant="primary" label="Go back" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-4 right-4 text-gray-300 text-2xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {passed ? <FaCheckCircle /> : <FaTimesCircle />}
            </motion.div>
          </div>
        </motion.div>
      </DashboardContainer>
    </div>
  );
};

export default ResultPage;
