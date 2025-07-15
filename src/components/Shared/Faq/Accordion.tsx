import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

const accordingData = [
  {
    title: "What is the purpose of wireframing in design?",
    description:
      "Wireframing outlines the basic structure and layout of a design, serving as a visual guide before detailed development.",
  },
  {
    title: "Why is user-centered design important?",
    description:
      "User-centered design ensures products meet the needs and preferences of the end-users, enhancing usability and satisfaction.",
  },
  {
    title: "What role does contrast play in graphic design?",
    description:
      "Contrast in graphic design emphasizes differences, making elements stand out and improving visual hierarchy.",
  },

  {
    title: `Define the term "responsive design" in web development.`,
    description:
      "Responsive design ensures web pages adapt to various screen sizes, providing an optimal user experience on different devices.",
  },

  {
    title: "What is the significance of color theory in design?",
    description:
      "Color theory guides the selection and combination of colors to evoke specific emotions, enhance readability, and create visually appealing designs.",
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
