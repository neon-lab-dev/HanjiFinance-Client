/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import ReadyToInvest from "../../components/Shared/ReadyToInvest/ReadyToInvest";
import { contents } from "./content.aboutUs";
import {
  containerVariants,
  itemVariants,
} from "../../utils/aboutUsPageAnimation";
const AboutUs = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="About Us" />

      <div className="bg-gradient-terms-and-conditions pt-[30px] overflow-hidden">
        <Container>
          <div className="flex flex-col gap-8">
            {contents?.map((item, index) => (
              <motion.div
                key={index}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h1
                  className="text-secondary-15 text-xl font-bold leading-6"
                  variants={itemVariants}
                >
                  {item?.title}
                </motion.h1>
                {item?.description && (
                  <motion.p
                    className="text-neutral-20 text-sm leading-5 mt-4"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    variants={itemVariants}
                  />
                )}
                <div className="text-neutral-20 text-sm">
                  {item?.details?.map((detail: any, index: number) => (
                    <div key={index}>
                      {detail?.pointersMainHeading && (
                        <motion.p
                          className="font-semibold leading-5 mt-2"
                          variants={itemVariants}
                        >
                          {detail?.pointersMainHeading}
                        </motion.p>
                      )}
                      {detail?.pointersTitle && (
                        <motion.p
                          className="font-medium leading-5 mt-2"
                          variants={itemVariants}
                        >
                          {detail?.pointersTitle}
                        </motion.p>
                      )}
                      {detail?.pointersSubTitle && (
                        <motion.p
                          className="leading-5 mt-1"
                          variants={itemVariants}
                        >
                          {detail?.pointersSubTitle}
                        </motion.p>
                      )}
                      {detail?.pointers && (
                        <motion.div
                          className="flex flex-col mt-4"
                          variants={itemVariants}
                        >
                          {detail?.pointers?.map(
                            (pointer: string, index: number) => (
                              <div key={index} className="leading-5">
                                {pointer}
                              </div>
                            )
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
        <motion.div
          className="bg-gradient-section-blur h-[113px] w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </div>
      <ReadyToInvest />
    </div>
  );
};

export default AboutUs;
