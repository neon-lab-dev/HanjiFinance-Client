import { motion } from "framer-motion";
import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import { containerVariants, itemVariants } from "../../utils/aboutUsPageAnimation";

const ClientGrievance = () => {

  return (
    <div className="font-Montserrat">
      <ReusableHero title="Client Grievance Redressal Mechanism" />

      <div className="bg-gradient-terms-and-conditions py-[30px] overflow-hidden">
        <Container>
          <div className="flex flex-col gap-8">
            {/* Step 1 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h1
                className="text-secondary-15 text-xl font-bold leading-6"
                variants={itemVariants}
              >
                Step 1
              </motion.h1>
              <motion.h2
                className="text-neutral-20 text-[17px] font-semibold leading-5 mt-4"
                variants={itemVariants}
              >
                Internal Resolution
              </motion.h2>
              <motion.p
                className="text-neutral-20 text-sm leading-5 mt-2"
                variants={itemVariants}
              >
                Email your concern to hanjifinanceteam@gmail.com with subject
                line “Grievance – [Your Name] – [Order/Client ID]”. We aim to
                resolve all issues within 15 working days.
              </motion.p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h1
                className="text-secondary-15 text-xl font-bold leading-6"
                variants={itemVariants}
              >
                Step 2
              </motion.h1>
              <motion.h2
                className="text-neutral-20 text-[17px] font-semibold leading-5 mt-4"
                variants={itemVariants}
              >
                Escalation
              </motion.h2>
              <motion.p
                className="text-neutral-20 text-sm leading-5 mt-2"
                variants={itemVariants}
              >
                If you are not satisfied with our response, write to:
              </motion.p>
              <motion.p
                className="text-neutral-20 text-sm leading-5 mt-2"
                variants={itemVariants}
              >
                Grievance Officer
                <br />
                Amandeep Singh Juneja
                <br />
                Email:hanjifinanceteam@gmail.com
              </motion.p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h1
                className="text-secondary-15 text-xl font-bold leading-6"
                variants={itemVariants}
              >
                Step 3
              </motion.h1>
              <motion.h2
                className="text-neutral-20 text-[17px] font-semibold leading-5 mt-4"
                variants={itemVariants}
              >
                SEBI SCORES Platform
              </motion.h2>
              <motion.p
                className="text-neutral-20 text-sm leading-5 mt-2"
                variants={itemVariants}
              >
                For advisory-related complaints that remain unresolved after 30
                days, registered clients may escalate via SEBI SCORES
                (https://scores.gov.in) quoting our RIA Registration Number.
              </motion.p>
            </motion.div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ClientGrievance;