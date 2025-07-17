import { motion } from "framer-motion";
import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import { contents } from "./contents.tc";
import {
  containerVariants,
  itemVariants,
} from "../../utils/aboutUsPageAnimation";

const TermsAndConditions = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="Terms and Conditions" />

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
                className="text-neutral-20 text-sm"
              >
                <motion.h1
                  className="text-secondary-15 text-xl font-bold leading-6"
                  variants={itemVariants}
                >
                  {item?.title}
                </motion.h1>

                {item?.description && (
                  <motion.p
                    className="leading-5 mt-4"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    variants={itemVariants}
                  />
                )}

                {item?.pointersTitle && (
                  <motion.p
                    className="font-medium leading-5 mt-2"
                    variants={itemVariants}
                  >
                    {item?.pointersTitle}
                  </motion.p>
                )}

                {item?.pointersSubTitle && (
                  <motion.p className="leading-5 mt-1" variants={itemVariants}>
                    {item?.pointersSubTitle}
                  </motion.p>
                )}

                {item?.pointers && (
                  <motion.div className="flex flex-col" variants={itemVariants}>
                    {item?.pointers?.map((pointer, index) => (
                      <div
                        key={index}
                        className="leading-5 mt-1 flex items-center gap-3"
                      >
                        <div className="size-1 rounded-full bg-neutral-30"></div>{" "}
                        {pointer}
                      </div>
                    ))}
                  </motion.div>
                )}

                {item?.footerText && (
                  <motion.p className="leading-5 mt-1" variants={itemVariants}>
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

export default TermsAndConditions;
