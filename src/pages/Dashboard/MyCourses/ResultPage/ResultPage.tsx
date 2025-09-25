import React, { useEffect, useState } from "react";
import DashboardContainer from "../../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div>
      <DashboardContainer>
        <div className="flex flex-col items-center justify-center p-4 space-y-3 font-Montserrat">
            <p className="text-primary-20 font-bold ">Congratulation</p>
                      <p className="text-accent-10 font-medium">
            Your Score : <span>8</span>
          </p>
          <p className="text-neutral-10 text-[15px] leading-[18px] mt-4 text-center">
            You will be redirected to the home page in {counter} second
            {counter !== 1 && "s"}...
          </p>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ResultPage;
