/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { useEffect } from "react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../redux/Features/User/userApi";
import toast from "react-hot-toast";
type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pinCode: string;
};
type LocationFormProps = {
  setLocationModalOpen: (isOpen: boolean) => void;
};

const LocationForm = ({ setLocationModalOpen }: LocationFormProps) => {
  const { data: myProfile, isLoading } = useGetMeQuery({});
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    if (myProfile?.data) {
      const user = myProfile.data;
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("phoneNumber", user?.phoneNumber);
      setValue("addressLine1", user?.addressLine1);
      setValue("addressLine2", user?.addressLine2 || "");
      setValue("city", user?.city);
      setValue("pinCode", user?.pinCode);
    }
  }, [myProfile?.data, setValue]);

  const handleUpdateDeliveryAddress = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("addressLine1", data.addressLine1 || "");
      formData.append("addressLine2", data.addressLine2 || "");
      formData.append("city", data.city);
      formData.append("pinCode", data.pinCode);
      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast.success("Delivery address saved.");
        setLocationModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="px-12 py-6 space-y-9">
      <h3 className=" text-center text-neutral-20 text-2xl leading-7 font-medium">
        <span className="bg-primary-10 px-2 text-white mr-2">
          Delivery Address
        </span>
        Form{" "}
      </h3>
      <div>
        <form
          onSubmit={handleSubmit(handleUpdateDeliveryAddress)}
          className="space-y-5"
        >
          <TextInput
            label="Name"
            placeholder="For e.g., Mohit Naroune"
            error={errors.name}
            {...register("name", {
              required: "Your name is required",
            })}
          />
          <TextInput
            label="Email"
            placeholder="you@email.com"
            error={errors.email}
            {...register("email", {
              required: "Your email is required",
            })}
          />
          <TextInput
            label="Phone"
            placeholder="for e.g.,96000  16417"
            error={errors.phoneNumber}
            {...register("phoneNumber", {
              required: "Your Phone Number is required",
            })}
            icon={ICONS.phone}
          />
          <TextInput
            label="Address Line 1"
            placeholder="House No., Street"
            error={errors.addressLine1}
            {...register("addressLine1", {
              required: "Address Line 1 is required",
            })}
          />
          <TextInput
            label="Address Line 2"
            placeholder="Apartment, Landmark"
            error={errors.addressLine2}
            {...register("addressLine2")}
            isRequired={false}
          />
          <TextInput
            label="Pin Code"
            placeholder="For e.g., 110056"
            error={errors.pinCode}
            {...register("pinCode", {
              required: "Pin Code is required",
            })}
          />
          <TextInput
            label="City"
            placeholder="For e.g., Delhi"
            error={errors.city}
            {...register("city", {
              required: "City is required",
            })}
          />
          <Button
            variant="primary"
            label="Save"
            type="submit"
            classNames="w-full"
            isLoading={isUpdateProfileLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
