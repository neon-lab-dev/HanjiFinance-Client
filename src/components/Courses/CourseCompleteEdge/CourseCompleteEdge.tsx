'use client';

import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import { IMAGES } from "./../../../assets/index";
import { motion, type Variants} from "framer-motion";
const itemFadeInUp: Variants = {
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


const containerStagger: Variants = {
  hidden: { opacity: 1 }, 
  visible: {
    opacity: 1, 
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const CourseCompleteEdge = () => {
  const whyUs = [
    {
      icon: ICONS.assetBreakdown,
      title: "Tech-enabled learning",
      description:
        "Experience a seamless, interactive learning journey powered by advanced digital tools and smart tech.",
    },
    {
      icon: ICONS.riskMapping,
      title: "Real-world finance case studies",
      description:
        "Apply concepts to practical scenarios and gain insights from authentic finance challenges faced by professionals.",
    },
    {
      icon: ICONS.portfolioManagement,
      title: "Premium learner community",
      description:
        "Connect, collaborate, and grow with a network of motivated learners and industry experts.",
    },
  ];
  const perk = [
    {
      icon: ICONS.crownStar,
      title: "Extra 2 years access for all 3 courses",
    },
    {
      icon: ICONS.verifiedCertificate,
      title: "Premium certification (exclusive for bundle buyers)",
    },
    {
      icon: ICONS.userCheck,
      title: "Priority Q&A with finance mentors",
    },
  ];
  return (
    
    <div className="relative h-full bg-gradient-good-news font-Montserrat overflow-hidden">
      <Container>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }} 
        >
          <motion.div variants={itemFadeInUp}>
            <SectionTitle
              heading="Get the Complete Edge"
              subHeading="From saving to scaling to future-proofing. Master it all, become financially unstoppable."
            />
          </motion.div>

          <motion.div
            className="flex h-full justify-between items-center mt-12 p-6 gap-[60px]"
            variants={containerStagger} 
          >
            
            <motion.div className="w-[60%] space-y-8 h-full" variants={containerStagger}>
             
              <motion.div className="space-y-2" variants={itemFadeInUp}>
                <h5 className="text-neutral-10 text-xl font-medium leading-6">
                  Get’em all
                </h5>
                <p className="text-neutral-160 leading-[22px]">
                  Get ready to master Finance in all dimensions.
                </p>
              </motion.div>

 
              <motion.div className="space-y-4" variants={containerStagger}>
                <motion.h5 className="text-neutral-10 text-xl font-medium leading-6" variants={itemFadeInUp}>
                  What’s Inside the Bundle?
                </motion.h5>
               
                <div className="flex gap-4"> 
                  <motion.div className="grid grid-cols-3 gap-4" variants={containerStagger}>
                    {whyUs.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="p-6 flex flex-col justify-center items-start gap-6 border border-neutral-98 rounded-lg"
                        variants={itemFadeInUp}
                      >
                        <div className="size-12 bg-neutral-100 p-3 flex items-center justify-center">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="size-9"
                          />
                        </div>
                        <div className="space-y-3">
                          <h5 className="text-lg text-neutral-10 font-semibold">{item.title}</h5>
                          <p className="text-neutral-180 leading-5">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

            
              <motion.div className="space-y-2" variants={containerStagger}>
                <motion.h2 className="text-neutral-10 text-xl font-medium leading-6" variants={itemFadeInUp}>
                  Extra Perks with Bundle
                </motion.h2>
       
                <motion.div className="grid grid-cols-3 gap-4" variants={containerStagger}>
                  {perk.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="px-2 py-4 flex flex-col justify-start items-center gap-6 border border-neutral-98 rounded-lg"
                      variants={itemFadeInUp}
                    >
                      <div className="size-10 bg-neutral-170 p-2 flex items-center rounded-full justify-center">
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="size-9"
                        />
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-sm font-medium">{item.title}</h5>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

          
            <motion.div className="w-[40%] h-full" variants={itemFadeInUp}>
              <div className="border border-neutral-98 w-full h-full rounded-3xl">
                <div className="bg-secondary-10 rounded-t-3xl flex items-center justify-center py-2 gap-2">
                  <img src={ICONS.star} alt="" className=" h-full" />
                  <span className="text-white text-xs font-semibold">
                    BEST VALUE
                  </span>
                  <img src={ICONS.star} alt="" className=" h-full" />
                </div>
                <div className="h-full flex items-center justify-center relative">
                  <img src={IMAGES.courseBundle} alt="" className=" my-8 h-full" />
                  <div className="absolute bg-white/40 backdrop-blur-sm h-[120px] w-full p-[30px] flex items-center justify-center">
                    <div className="bg-gradient-brown flex items-center justify-center rounded-lg p-3 size-12">
                      <img src={ICONS.unlock} alt="" className=" size-9" />
                    </div>
                    <div className="bg-gradient-brown-bg py-[1px] pr-[1px] rounded-r-sm">
                      <div className="bg-white py-1 px-[6px] rounded-r-sm">
                        <p className="bg-[linear-gradient(90deg,#C0392B_3.47%,#9D6100_110.42%)] bg-clip-text text-transparent text-xl leading-6 font-bold">
                          Unlock 3 courses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary-30 flex flex-col rounded-b-3xl p-4 gap-6">
                  <p className="text-neutral-10 text-xl font-medium leading-6">
                    Unlock the bundle at a special Price
                  </p>
                  <div className="flex items-center w-full justify-between gap-6 text-nowrap">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold leading-9 tracking-tighter">
                        ₹ 49,900
                      </h2>
                      <p className="text-[13px] text-neutral-175 leading-4 text-nowrap">
                        Price excluding GST
                      </p>{" "}
                    </div>
                    
                    <Button
                      variant="primary"
                      label="Unlock The Bundle!"
                      classNames="w-full px-8 py-4"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
      <div className="bg-gradient-courses-bundle w-full h-[168px] blur-xs"></div>
    </div>
  );
};

export default CourseCompleteEdge;