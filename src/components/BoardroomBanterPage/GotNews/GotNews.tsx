import { useForm } from "react-hook-form";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
type FormData = {
  fullName: string;
  email: string;
};
const GotNews = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-gradient-good-news pt-[60px] font-Montserrat">
      <Container>
        <SectionTitle
          heading="You got the good news? "
          subHeading="Put in your special code & proceed to join"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center "
        >
          <div className="flex justify-between gap-6 w-lg">
            <TextInput
              isRequired={false}
              placeholder="Enter your valid coupon Code"
              error={errors.fullName}
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            <Button
              type="submit"
              label="Proceed"
              variant="secondary"
              className="py-4 px-8 leading-[18px]"
            />
          </div>
        </form>
      </Container>
      <div className="bg-gradient-good-news-blur h-[100px] w-full"></div>
    </div>
  );
};

export default GotNews;
