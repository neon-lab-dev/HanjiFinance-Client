import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-10 h-10 border-4 border-primary-10 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
