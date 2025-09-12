import { useState } from "react";

const ExpandableDescription = ({ description } : {description:string}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to truncate description if not expanded
  const renderDescription = () => {
    if (isExpanded || description.length <= 80) {
      return description;
    }
    return `${description.slice(0, 80)}...`;
  };

  return (
    <div>
      <p className="text-base md:text-lg font-medium leading-6 md:leading-[32px] text-neutral-85">
        {renderDescription()}{" "}
        {/* The button is inline with the text */}
        {description.length > 80 && (
          <button
            onClick={toggleExpanded}
            className="text-primary-20 font-semibold leading-8 text-lg underline inline"
          >
            {isExpanded ? "Show Less" : "More"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ExpandableDescription;
