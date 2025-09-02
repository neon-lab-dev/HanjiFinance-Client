

const DeliveryOptions = () => {
    return (
        <div className="flex flex-col gap-6 mt-6">
        <h1 className="text-[#333] text-xl font-semibold leading-6">
          Delivery Options
        </h1>

        <div className="px-6  border border-[#333] rounded-xl h-16 bg-white flex items-center justify-between">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your pin code to check"
            className="h-full focus:outline-none"
          />
          <p className="text-[#F82456] text-sm font-semibold leading-6 my-[10px] cursor-pointer">
            Check Shipping
          </p>
        </div>
      </div>
    );
};

export default DeliveryOptions;