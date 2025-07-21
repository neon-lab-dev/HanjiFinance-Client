/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import { contents } from "./contents.pribacyPolicy";
import {
  containerVariants,
  itemVariants,
} from "../../utils/aboutUsPageAnimation";

const PrivacyPolicy = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="Privacy Policy" />

      <div className="bg-gradient-terms-and-conditions py-[30px] overflow-hidden">
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
                          className="flex flex-col"
                          variants={itemVariants}
                        >
                          {detail?.pointers?.map(
                            (pointer: string, index: number) => (
                              <div
                                key={index}
                                className="leading-5 mt-1 flex items-center gap-3"
                              >
                                <div className="size-1 rounded-full bg-neutral-30"></div>{" "}
                                {pointer}
                              </div>
                            )
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {item?.footerText && (
                  <motion.p
                    className="leading-5 mt-1"
                    variants={itemVariants}
                  >
                    {item?.footerText}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
