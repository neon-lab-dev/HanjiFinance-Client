import { useSelector } from "react-redux";
import Container from "../../components/Reusable/Container/Container";
import { getCartProducts } from "../../redux/Features/Cart/cartSlice";
import Location from "../../components/Payment/Location/Location";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import PaymentProductsCards from './../../components/Payment/PaymentProductsCards/PaymentProductsCards';

const Cart = () => {
  const cartProducts = useSelector(getCartProducts);

  return (
    <div className="font-Montserrat py-5 md:py-10 bg-surface-30 ">
        <Container>
          <div className="space-y-8">
            <div className="flex justify-between items-center  pb-8 border-b border-b-neutral-97 ">
              <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
               Cart Page <span>{`(${cartProducts.length} ${ cartProducts.length ==1 ?"item":"items"})`}</span>
              </h2>
              <Location />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
            <PaymentProductsCards items={cartProducts}/>
            <PaymentCard
              items={cartProducts}
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

export default Cart;
