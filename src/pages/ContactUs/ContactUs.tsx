import { useForm } from "react-hook-form";
import Button from "../../components/Reusable/Button/Button";
import Textarea from "../../components/Reusable/TextArea/TextArea";
import TextInput from "../../components/Reusable/TextInput/TextInput";
import { useState } from "react";

type TFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  query: string;
};

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>();

  const handleSendMessage = () => {
    try {
      setIsLoading(true);
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="rounded-[20px] bg-neutral-99/50 shadow-md border border-neutral-98 font-Montserrat p-6 max-w-3xl mx-auto my-16">
      <h1 className="text-neutral-30 text-xl text-center font-bold leading-6">
        Get in Touch With Us
      </h1>
      <p className="text-neutral-50 text-sm leading-5 mt-3 text-center max-w-[500px] mx-auto">
        Have questions, feedback, or ideas? Our team is here to help and would
        love to hear from you. Reach out and we’ll get back to you shortly.
      </p>

      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex flex-col gap-8 mt-8 w-full"
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

        <Textarea
          label="Query"
          placeholder="Tell us about the issue you are facing..."
          rows={6}
          error={errors.query}
          {...register("query")}
          isRequired={false}
        />

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            label="Send Message"
            classNames="w-full sm:w-fit"
            isLoading={isLoading}
          />
        </div>

        <p className="text-neutral-5 text-sm font-medium leading-4 text-center">
          Got and emergency?{" "}
          <a
            href="tel:+91 98765 00000"
            className="font-semibold text-primary-10"
          >
            Call Us
          </a>
        </p>
      </form>
    </div>
  );
};

export default ContactUs;
