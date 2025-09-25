/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../../redux/Features/Cart/cartSlice";

const PaymentProductsCards = ({ items }: any) => {
  const dispatch = useDispatch();

  const handleIncrement = (
    productId: string,
    sizeId: string,
    currentQuantity: number
  ) => {
    dispatch(
      updateQuantity({
        productId,
        sizeId,
        quantity: currentQuantity + 1,
      })
    );
  };

  const handleDecrement = (
    productId: string,
    sizeId: string,
    currentQuantity: number
  ) => {
    dispatch(
      updateQuantity({
        productId,
        sizeId,
        quantity: currentQuantity - 1,
      })
    );
  };
  const handleRemoveClick = (productId: string, sizeId: string) => {
    dispatch(removeFromCart({ productId, sizeId }));
  };

  return (
    <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-4">
      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="p-6 flex justify-between h-fit border-b border-neutral-98"
        >
          <div className="flex gap-8">
            <div className="bg-primary-30 rounded-lg flex justify-center items-center w-20">
              <img src={item.image} alt={item.name} className="h-16 lg" />
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="font-medium text-neutral-25 leading-[22px] capitalize">
                {item.name}
              </h3>
              <p className="text-[17px] font-semibold leading-5 text-neutral-20">
                ₹{item.price} x {item.quantity}  |  color : {item.color}
              </p>
            </div>
          </div>
          <div className="flex gap-2 h-fit">
            <div className="gap-3 py-2 px-3 text-neutral-115 flex items-center justify-center bg-secondary-25 rounded-lg">
              <div
                onClick={() =>
                  handleDecrement(item.productId, item.sizeId, item.quantity)
                }
                className="cursor-pointer px-1"
              >
                -
              </div>
              {item.quantity}
              <div
                onClick={() =>
                  handleIncrement(item.productId, item.sizeId, item.quantity)
                }
                className="cursor-pointer px-1"
              >
                +
              </div>
            </div>
            <div className="bg-primary-30 rounded-lg py-2 px-3  flex items-center justify-center">
              <BiTrash
                className="text-primary-10 text-base cursor-pointer"
                onClick={() => handleRemoveClick(item.productId, item.sizeId)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="h-[13px] w-full bg-gradient-cart"></div>
    </div>
  );
};

export default PaymentProductsCards;
