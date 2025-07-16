import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";


const accordingData = [
  {
    title: "Are you SEBI-registered?",
    description:
      "Yes. Amandeep Singh Juneja is a SEBI-Registered Investment Adviser (RIA). Registration number will appear on every invoice and email once issued.",
  },
  {
    title: "Do you give stock tips?",
    description:
      "No. We teach frameworks and offer goal-based advice. No intraday or speculative calls in any paid or free channel.",
  },
  {
    title: "How are you compensated?",
    description:
      "100% fee-only. We do not accept commissions, referral fees, or brokerage kick-backs.",
  },
  {
    title: "Can I get a refund on a digital course?",
    description:
      "Digital products are non-refundable once access is granted (see Refund Policy).",
  },
  {
    title: "How is my data protected?",
    description:
      "We follow industry-standard encryption, store data on secure servers, and never sell personal info. Full details in our Privacy Policy.",
  },
  {
    title: "Is NPS / PPF / ELSS right for me?",
    description:
      "It depends on your goals, horizon, and risk profile. Book a 1-on-1 session or complete our risk-profiling questionnaire for personalised advice.",
  },
];
const Accordion = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));
  return (
    <div className="flex gap-3 flex-col w-full mt-12">
      {accordingData?.map((according, index) => (
        <article
          key={index}
          className="border-b border-neutral-97 rounded py-5"
        >
          <div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleClick(index)}
          >
            <h2 className="text-neutral-10 font-medium leading-[22px]">
              {according.title}
            </h2>
            <p>
              <IoChevronDownSharp
                className={`text-[1.2rem] dark:text-slate-600 text-text transition-all duration-300 ${
                  isAccordingOpen === index &&
                  "rotate-[180deg] !text-primary-10"
                }`}
              />
            </p>
          </div>
          <div
            className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
              isAccordingOpen === index
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="text-neutral-30 text-sm leading-5 overflow-hidden">
              {according.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Accordion;
