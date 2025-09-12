import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
};
type LocationFormProps = {
  setLocationModalOpen: (isOpen: boolean) => void;
};

const LocationForm = ({ setLocationModalOpen }: LocationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleFormSubmit = (data: TFormData) => {
    console.log(data);
    setLocationModalOpen(false);
  };
  return (
    <div className="px-12 py-6 space-y-9">
      <h3 className=" text-center text-neutral-20 text-2xl leading-7 font-medium">
        <span className="bg-primary-10 px-2 text-white mr-2">
          Delivery Address
        </span>
        Form{" "}
      </h3>
      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
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
            {...register("addressLine2", {
              required: "Address Line 2 is required",
            })}
          />
          <TextInput
            label="PinCode"
            placeholder="For e.g., 110056"
            error={errors.zipCode}
            {...register("zipCode", {
              required: "Zip Code is required",
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
          />
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
