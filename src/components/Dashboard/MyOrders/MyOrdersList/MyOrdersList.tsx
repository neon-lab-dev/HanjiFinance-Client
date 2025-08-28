import { BiSearch } from "react-icons/bi";
import MyOrdersCard from "../MyOrdersCard/MyOrdersCard";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";

const MyOrdersList = () => {
    const orders = [
  {
    totalItems: 5,
    title: "Premium HanjiFinance T-shirt, Bottle, Diary & Pen, Co...",
    orderId: "ORD-2025-001",
    price: 7799,
    date: "1 August, 2025",
    category: "Fashion & Apparel",
    status: "Delivered" as const,
  },
  {
    totalItems: 3,
    title: "Modern Office Chair & Table",
    orderId: "ORD-2025-002",
    price: 12999,
    date: "5 August, 2025",
    category: "Furniture",
    status: "Pending" as const,
  },
  {
    totalItems: 2,
    title: "Wireless Earbuds & Smartwatch",
    orderId: "ORD-2025-003",
    price: 5999,
    date: "10 August, 2025",
    category: "Electronics",
    status: "Cancelled" as const,
  },
];
  return (
    <div className="bg-white rounded-2xl space-y-4 mt-6">
      <div className="py-6 flex justify-between items-center border-b-[1px] border-neutral-98 px-4">
        <h2 className="text-accent-5 text-xl leading-6 font-medium">
          Order History
        </h2>
        <div className="flex w-fit items-center justify-between gap-9 ">
          {/* Search Bar */}
          <div className="relative w-64 bg-surface-30">
            <input
              type="text"
              placeholder="Search Orders..."
              className="w-full pl-10 p-4 py-2 text-sm border border-surface-90 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
             <BiSearch className="absolute left-3  top-3 text-neutral-115"/>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button className="px-2 py-2 size-[38px] flex items-center justify-center  rounded hover:bg-gray-100">
              &laquo;
            </button>
            <button className="px-3 py-2 size-[38px] flex items-center justify-center border rounded hover:bg-gray-100">
              1
            </button>
            <button className="px-3 py-2 size-[38px] flex items-center justify-center  hover:bg-gray-100 ">2</button>
            <button className="px-3 py-2 size-[38px] flex items-center justify-center  hover:bg-gray-100">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-2 size-[38px] flex items-center justify-center  hover:bg-gray-100">10</button>
            <button className="px-2 py-2 size-[38px] flex items-center justify-center  rounded hover:bg-gray-100">
              &raquo;
            </button>
            <Button variant="custom" label="Export" classNames="py-2 border-[1px] px-4 border-surface-90 text-neutral-10 bg-surface-30"/>
            <div className="rounded-lg p-2 border-[1px]  border-surface-90 text-neutral-10 bg-surface-30"><img src={ICONS.sortArrow} className="size-5 "/></div>
            <div className="rounded-lg p-2 border-[1px]  border-surface-90 text-neutral-10 bg-surface-30"><img src={ICONS.filter} className="size-5 "/></div>
            
          </div>
        </div>
        
      </div>
      <div className="flex flex-col gap-4 px-4">
      {orders.map((order, index) => (
        <MyOrdersCard key={index} order={order} />
      ))}
    </div>
      
    </div>
  );
};

export default MyOrdersList;
