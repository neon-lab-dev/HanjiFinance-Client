import Container from "../../components/Reusable/Container/Container";
import PaymentPage from "../../components/Shared/PaymentCard/PaymentCard";

const Payment = () => {
  const exampleItems = [
    {
      name: "Boardroom Banter (exclusive whatsapp space)",
      subtitle: "Premium Service (subscription)",
      price: 500,
    },
    {
      name: "Financial Checkup 1 (Portfolio Review by Aman)",
      subtitle: "Premium Service",
      price: 1858.82,
    },
  ];

  return (
    <div className="">
      <PaymentPage
        items={exampleItems}
        showAutopayOption={true}
        isAutopayAvailable={true}
        onProceed={() => console.log("Proceed to Pay")}
        onCancel={() => console.log("Cancelled")}
      />
      \{" "}
    </div>
  );
};

export default Payment;
