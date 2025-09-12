import StatusCard from "../../Dashboard/SharedComponents/StatusCard/StatusCard";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";
import Button from "../../Reusable/Button/Button";
import { useState } from "react";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";

type TFormData = {
  status: string;
};

const OrderStatusCards = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleStatus = (data: TFormData) => {
    console.log("New order status:", data);
  };

  return (
    <div className="w-full ">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Orders */}
        <StatusCard
          icon={<FiPackage size={28} />}
          value={320}
          label="Total Orders"
          badgeText="All"
          badgeBg="bg-blue-100"
          badgeBorder="border-blue-400"
          badgeTextColor="text-blue-600"
        />

        {/* Pending Orders */}
        <StatusCard
          icon={<FiAlertCircle size={28} />}
          value={85}
          label="Pending Orders"
          badgeText="Pending"
          badgeBg="bg-yellow-100"
          badgeBorder="border-yellow-400"
          badgeTextColor="text-yellow-600"
        />

        {/* Delivered Orders */}
        <StatusCard
          icon={<FiCheckCircle size={28} />}
          value={200}
          label="Delivered Orders"
          badgeText="Delivered"
          badgeBg="bg-green-100"
          badgeBorder="border-green-400"
          badgeTextColor="text-green-600"
        />

        {/* Cancelled Orders */}
        <StatusCard
          icon={<FiXCircle size={28} />}
          value={35}
          label="Cancelled Orders"
          badgeText="Cancelled"
          badgeBg="bg-red-100"
          badgeBorder="border-red-400"
          badgeTextColor="text-red-600"
        />
      </div>

      {/* Modal for adding new order status */}
      <ConfirmationModal
        isConfirmationModalOpen={isStatusModalOpen}
        setIsConfirmationModalOpen={setIsStatusModalOpen}
        isCrossVisible={true}
      >
        <div className="flex flex-col items-center pb-6 px-8">
          <h1 className="text-neutral-20 text-lg font-medium leading-8 text-center tracking-[-0.56px]">
            Add New Order Status
          </h1>
          <form
            onSubmit={handleSubmit(handleStatus)}
            className="w-full mt-4 flex flex-col items-end"
          >
            <TextInput
              label="Status Name"
              type="text"
              placeholder="e.g. Processing"
              error={errors.status}
              {...register("status", {
                required: "Status is required",
              })}
            />
            <Button
              type="submit"
              label="Add Status"
              variant="primary"
              classNames="w-fit mt-4 px-3 py-2"
            />
          </form>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default OrderStatusCards;
