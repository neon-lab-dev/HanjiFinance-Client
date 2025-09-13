import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import PaymentProductsCard from "../../components/Payment/PaymentProductsCard/PaymentProductsCard";
import Container from "../../components/Reusable/Container/Container";

const Payment = () => {
  const data={
    price:1000,
    title:"boardroom banter",
    subtitle:"connect with our group",
    quantity:1,
    basePrice:"1000 / month"

  } 
  return (
    <div className="bg-surface-30">
        <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Course Payment
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
          <PaymentProductsCard item={data} />
          <PaymentCard
            items={[data]} 
            gstRate={18}
            isAutopayAvailable={true}
            showAutopayOption={true}
            onProceed={() => {
              console.log("Proceed button clicked");
            }}
          />
        </div>
      </Container>
      
    </div>
  );
};

export default Payment;
