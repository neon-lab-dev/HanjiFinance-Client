import React from "react";
import Container from "../../Reusable/Container/Container";
import PaymentCard from "../../Payment/PaymentCard/PaymentCard";
import type { TProduct } from "../../E-Commerce/ProductsSection/ProductsSection";
import Location from "../../Payment/Location/Location";
import PaymentProductsCard from "../../Payment/PaymentProductsCard/PaymentProductsCard";

type PaymentPageProps = {
  items: TProduct[];
};

const PaymentPage: React.FC<PaymentPageProps> = ({ items }) => {

  return (
    <div className="font-Montserrat py-8 md:py-16">
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center  pb-8 border-b border-b-neutral-97">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Payment Page
            </h2>
          <Location/>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31">
            <PaymentProductsCard items={items}/>
            <PaymentCard
              gstRate={18}
              items={items}
              isAutopayAvailable={true}
              showAutopayOption={true}
              onProceed={() => {
                console.log("Proceed button clicked");
              }}
            />
          </div>
          {
            <p className="text-neutral-25 text-sm leading-5 w-full md:w-[60%] ">
              Note : Cancel your subscription anytime, you can connect to out
              team via email . hanjifinance@gmal.com for any discrepancy
            </p>
          }
        </div>
      </Container>

    </div>
  );
};

export default PaymentPage;
