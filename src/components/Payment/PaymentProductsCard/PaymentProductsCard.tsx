/* eslint-disable @typescript-eslint/no-explicit-any */
const PaymentProductsCard = ({ item }:any) => {
  if (!item) return null;

  return (
    <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-5">
      <div className="mb-4 flex justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-neutral-25 leading-[22px]">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-[13px] leading-4 text-neutral-70 tracking-[-0.14px]">
              {item.subtitle}
            </p>
          )}
        </div>

        <p className="text-[17px] font-semibold leading-5 text-neutral-20">
          ₹{item.discountedPrice ?? item.basePrice}
        </p>
      </div>
    </div>
  );
};

export default PaymentProductsCard;
