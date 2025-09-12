import { useParams } from "react-router-dom";
import { useGetSingleCourseByIdQuery } from "../../redux/Features/Course/courseApi";
import Container from "../../components/Reusable/Container/Container";
import PaymentProductsCard from "../../components/Payment/PaymentProductsCard/PaymentProductsCard";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";

const CoursePayment = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, isError } = useGetSingleCourseByIdQuery(id);

  const courseData={
    price:course.data.discountedPrice,
    quantity:1
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError || !course?.data) return <p>Something went wrong!</p>;

  return (
    <div className="font-Montserrat py-5 md:py-10 bg-surface-30">
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Course Payment
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
          <PaymentProductsCard item={course.data} />
          <PaymentCard
            items={[courseData]} 
            gstRate={18}
            isAutopayAvailable={false}
            showAutopayOption={false}
            onProceed={() => {
              console.log("Proceed button clicked");
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default CoursePayment;
