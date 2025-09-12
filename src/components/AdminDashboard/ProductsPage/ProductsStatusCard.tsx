import StatusCard from "../../Dashboard/SharedComponents/StatusCard/StatusCard";
import { FiAlertCircle, FiCheckCircle, FiPackage } from "react-icons/fi";
import Button from "../../Reusable/Button/Button";
import { useState } from "react";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
type TFormData = {
  category: string;
};
const ProductsStatusCard = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleCategory = (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="w-full ">
      {/* <div className="flex justify-end py-2 ">
        <Button
          onClick={() => setIsCategoryModalOpen(true)}
          variant="primary"
          label="Add New Category"
          classNames="px-4 py-2"
        />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 gap-4">
        {/* Total Products */}
        <StatusCard
          icon={<FiPackage size={28} />}
          value={120}
          label="Total Products"
          badgeText="All"
          badgeBg="bg-blue-100"
          badgeBorder="border-blue-400"
          badgeTextColor="text-blue-600"
        />

        {/* Active Products */}
        <StatusCard
          icon={<FiCheckCircle size={28} />}
          value={95}
          label="Available Products"
          badgeText="Live"
          badgeBg="bg-green-100"
          badgeBorder="border-green-400"
          badgeTextColor="text-green-600"
        />

        {/* Out of Stock */}
        <StatusCard
          icon={<FiAlertCircle size={28} />}
          value={25}
          label="Out of Stock"
          badgeText="Low Stock"
          badgeBg="bg-red-100"
          badgeBorder="border-red-400"
          badgeTextColor="text-red-600"
        />
      </div>
      <ConfirmationModal
        isConfirmationModalOpen={isCategoryModalOpen}
        setIsConfirmationModalOpen={setIsCategoryModalOpen}
        isCrossVisible={true}
      >
        <div className="flex flex-col items-center pb-6 px-8">
          <h1 className="text-neutral-20 text-lg font-medium leading-8 text-center tracking-[-0.56px]">
            Add New Category
          </h1>
          <form onSubmit={handleSubmit(handleCategory)} className="w-full mt-4 flex flex-col items-end">
            <TextInput
              label="Category Name"
              type="add new category"
              placeholder="you@email.com"
              error={errors.category}
              {...register("category", {
                required: "Category is required",
              })}
            />
            <Button
              type="submit"
              label="Add Category"
              variant="primary"
              classNames="w-fit mt-4 px-3 py-2"
            />
          </form>

          <div className="w-full px-6"></div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default ProductsStatusCard;
