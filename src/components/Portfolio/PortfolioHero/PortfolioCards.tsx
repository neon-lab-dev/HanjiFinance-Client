/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAngleRight } from "react-icons/fa";

const PortfolioCards = ({ item }: any) => {
  return (
    <div className="w-full p-6 border border-[#C7D2FE] rounded-lg bg-white font-Montserrat h-[382px] flex flex-col justify-between">
      <div>
        <div className="bg-neutral-100 rounded-lg p-3 flex items-center justify-center w-fit">
          <img src={item.icon} alt="" className="size-9" />
        </div>

        <div className="mt-6">
          <h2 className="text-neutral-10 text-xl font-medium leading-6">
            {item.title}
          </h2>
          <p className="text-neutral-50 text-sm mt-3">{item.description}</p>
        </div>
      </div>

      <div className="">
        <p className="text-neutral-10 font-semibold leading-6">{item.price}</p>
        <p className="text-xs text-neutral-60 font-medium leading-3 mt-1">
          One time payment
        </p>
      </div>
      <button
        className="text-primary-20 flex items-center gap-2 text-[17px] font-semibold leading-5 transition-all duration-300 delay-100 transform hover:-translate-y-1 cursor-pointer"
        onClick={item.onClick}
      >
        {item?.buttonLabel} <FaAngleRight />
      </button>
    </div>
  );
};

export default PortfolioCards;
