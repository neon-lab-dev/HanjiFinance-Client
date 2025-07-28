import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

const PortfolioCards = ({ item }) => {
  return (
    <div className="w-full p-6 border border-indigos-10 rounded-lg bg-white space-y-6 self-start font-Montserrat">
      <img src={item.icon} alt="" className="p-3 size-9" />
      <div>
        <h2 className="text-indigo-900 text-base font-semibold">{item.title}</h2>
        <p className="text-indigo-500 text-sm">{item.description}</p>
      </div>
      <div>
        <p className="text-indigo-500 text-sm">{item.price}</p>
        <p>One time payment</p>
      </div>
      <div className="flex justify-start">
        <Link to="" className="text-indigo-500 text-sm">
          Learn More <FaAngleRight />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioCards;
