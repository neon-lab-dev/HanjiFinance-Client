import Container from "../../Reusable/Container/Container";
import { motion, type Variants } from "framer-motion";
import SectionTitle from "../../Reusable/Heading/Heading";
import { ICONS } from "../../../assets";

const WhyUs = () => {
  const whyUs = [
    {
      title: "Tech-enabled learning",
      description:
        "Experience a seamless, interactive learning journey powered by advanced digital tools and smart tech.",
    },
    {
      title: "Real-world finance case studies",
      description:
        "Apply concepts to practical scenarios and gain insights from authentic finance challenges faced by professionals.",
    },
    {
      title: "Premium learner community",
      description:
        "Connect, collaborate, and grow with a network of motivated learners and industry experts.",
    },
  ];

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <div className="bg-white py-[120px]">
      <div className="relative bg-gradient-why-us pt-10 font-Montserrat">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={titleVariants}>
            <SectionTitle
              heading="Why Choose Us?"
              subHeading="Start with our free newsletter or explore the course library today."
            />
          </motion.div>
          <div className="flex gap-4 mt-12">
            {whyUs.map((item, index) => (
              <div
                key={index}
                className="p-6 flex flex-col justify-center items-start gap-6 border border-neutral-98 rounded-lg"
              >
                <div className="size-12 bg-neutral-100 p-3 flex items-center justify-center">
                  <img
                    src={ICONS.tickBox}
                    alt={item.title}
                    className="size-9"
                  />
                </div>
                <div className="space-y-3">
                  <h5 className="text-lg font-semibold">{item.title}</h5>
                  <p className="text-neutral-30">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
        <div className="bg-gradient-why-us-section w-full h-[160px]"></div>
      </div>
    </div>
  );
};

export default WhyUs;
