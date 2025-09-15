import {  useSelector } from "react-redux";
import Container from "../../components/Reusable/Container/Container";
import { getCartProducts } from "../../redux/Features/Cart/cartSlice";
import Location from "../../components/Payment/Location/Location";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import PaymentProductsCards from "./../../components/Payment/PaymentProductsCards/PaymentProductsCards";
import { useGetRazorpayKeyQuery } from "../../redux/Features/User/userApi";
import { useProductCheckoutMutation } from "../../redux/Features/ProductOrders/productOrdersApi";
import { useState } from "react";
import { config } from "../../config/config";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import type { TUser } from "../../types/user.types";
import toast from "react-hot-toast";

const Cart = () => {
  
  const user = useSelector(useCurrentUser) as TUser;
  const cartProducts = useSelector(getCartProducts);

  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [productCheckout] = useProductCheckoutMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const totalToPay = cartProducts.reduce(
    (sum, item) => sum + item?.totalPrice,
    0
  );

  const handlePlaceProductOrder = async () => {
    if(cartProducts?.length < 1){
      toast.error("Cart is empty")
      return
    }
    setLoading(true);

    const payload = {
      amount: totalToPay,
    };

    let response;
    try {
      response = await productCheckout(payload).unwrap();
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    try {
      const options = {
        key: apiKey?.key,
        amount: response?.data?.amount,
        currency: "INR",
        name: "Hanjifinance",
        description: "Test Transaction",
        image: config.razorpayLogo,
        order_id: response?.data?.id,
        callback_url: `${config.baseUrl}/product-order/verify-payment`,
        prefill: {
          name: user?.name,
          email: user?.email,
          userId: user?._id,
        },
        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      const orderedItems = cartProducts.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      }));

      const productOrderData = {
        orderedItems,
        totalAmount: totalToPay,
      };

      localStorage.setItem(
        "productOrderData",
        JSON.stringify(productOrderData)
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-Montserrat py-5 md:py-10 bg-surface-30 ">
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center  pb-8 border-b border-b-neutral-97 ">
            <h2 className="text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Cart Page{" "}
              <span>{`(${cartProducts.length} ${
                cartProducts.length == 1 ? "item" : "items"
              })`}</span>
            </h2>
            <Location />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
          <PaymentProductsCards items={cartProducts} />
          <PaymentCard
            items={cartProducts}
            onProceed={handlePlaceProductOrder}
            isLoading={loading}
          />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
