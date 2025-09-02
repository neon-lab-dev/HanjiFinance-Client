import { ICONS } from "../../../../assets";


const DeliveryDetails = () => {
    return (
        <div className="flex flex-col gap-3 mt-6">
        <div className="flex items-center gap-4">
          <img src={ICONS.deliveryVan} alt="" className="size-7" />
          <p className="text-[#4F4F4F] font-medium leading-6">
            Delivering happiness throughout India
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img src={ICONS.cash} alt="" className="size-7" />
          <p className="text-[#4F4F4F] font-medium leading-6">
            Cash on Delivery available
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img src={ICONS.deliveryVan} alt="" className="size-7" />
          <p className="text-[#4F4F4F] font-medium leading-6">
            Easy return and exchanges within{" "}
            <span className="font-semibold">7 days</span>
          </p>
        </div>
      </div>
    );
};

export default DeliveryDetails;