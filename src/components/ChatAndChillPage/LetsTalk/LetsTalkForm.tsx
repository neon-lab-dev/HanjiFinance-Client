import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useEffect} from "react";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import Calender from "../../Reusable/Calender/Calender";

type TFormValues = {
  name: string;
  email: string;
  qualification: string;
  occupation: string;
  message: string;
  phoneNumber: string;
};

const LetsTalkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();


  useEffect(() => {
    register("occupation", {
      required: "Occupation is required",
    });
  }, [register]);

  const handleLetsTalk = (data: TFormValues) => {
    const finalData = { ...data};
    console.log("Form Data:", finalData);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log(event);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="rounded-[20px] bg-white border border-neutral-98 font-Montserrat flex mt-9">
      {/* Left Section */}
    <Calender/>

      {/* Right Section - Form */}
      <div className="p-6 rounded-tr-[20px] w-[60%]">
        <h1 className="text-neutral-30 text-xl text-center font-bold leading-6">
          Apply for Access
        </h1>

        <form
          onSubmit={handleSubmit(handleLetsTalk)}
          className="flex flex-col gap-8 mt-6 w-full"
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            error={errors.name}
            {...register("name", {
              required: "Your name is required",
            })}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="you@email.com"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <TextInput
            label="Phone Number"
            type="number"
            placeholder="for e.g., 800 788 9090"
            error={errors.phoneNumber}
            {...register("phoneNumber")}
            isRequired={false}
          />

          {/* Custom Dropdown */}
         
          <Textarea
            label="If we were chatting over coffee, what’s one thing you’d say about money or markets that not everyone agrees with?"
            placeholder="Your answer goes here....."
            rows={6}
            error={errors.message}
            {...register("message")}
            isRequired={false}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              label="Proceed to Book @ ₹999"
              classNames="w-full sm:w-fit"
            />
          </div>

          <p className="text-neutral-5 text-sm font-medium leading-4 text-center">
            Hurry up! limited slots available on first come first serve basis
          </p>
        </form>
      </div>
    </div>
  );
};

export default LetsTalkForm;
