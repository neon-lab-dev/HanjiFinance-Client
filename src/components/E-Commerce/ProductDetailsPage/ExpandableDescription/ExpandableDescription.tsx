import { useState } from "react";

const ExpandableDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
        {description.length > 80 && (
          <button
            onClick={toggleExpanded}
            className="text-primary-20 leading-8 underline inline"
          >
            {isExpanded ? "Show Less" : "More"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ExpandableDescription;
