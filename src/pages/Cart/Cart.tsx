import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Reusable/Container/Container";
import { getCartProducts } from "../../redux/Features/Cart/cartSlice";
import Location from "../../components/Payment/Location/Location";
import PaymentCard from "../../components/Payment/PaymentCard/PaymentCard";
import PaymentProductsCards from "./../../components/Payment/PaymentProductsCards/PaymentProductsCards";
import {
  useGetMeQuery,
  useGetRazorpayKeyQuery,
} from "../../redux/Features/User/userApi";
import { useProductCheckoutMutation } from "../../redux/Features/ProductOrders/productOrdersApi";
import { useState } from "react";
import { config } from "../../config/config";
import {
  setRedirectPath,
  useCurrentUser,
} from "../../redux/Features/Auth/authSlice";
import type { TUser } from "../../types/user.types";
import toast from "react-hot-toast";
import { openModal } from "../../redux/Features/Auth/authModalSlice";

const Cart = () => {
  const [isLocationModalOpen, setLocationModalOpen] = useState<boolean>(false);
  const { data: myProfile, isLoading } = useGetMeQuery({});
  const user = useSelector(useCurrentUser) as TUser;
  const cartProducts = useSelector(getCartProducts);
  const dispatch = useDispatch();
  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [productCheckout] = useProductCheckoutMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const totalToPay = cartProducts.reduce(
    (sum, item) => sum + item?.totalPrice,
    0
  );

  const handlePlaceProductOrder = async () => {
    if (!user) {
      toast.error("Please login to proceed");
      dispatch(openModal("login"));
      dispatch(setRedirectPath("/cart"));
      return;
    }

    if (cartProducts?.length < 1) {
      toast.error("Cart is empty");
      return;
    }

    if (
      !myProfile?.data?.addressLine1 ||
      !myProfile?.data?.city ||
      !myProfile?.data?.pinCode
    ) {
      toast.error("Please add delivery address");
      setLocationModalOpen(true);
      return;
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
        name : item.name,
        quantity: item.quantity,
        size: item.size,
        color:item.color,
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 pb-8 border-b border-b-neutral-97">
            <h2 className="md:w-[60%] text-2xl md:text-[32px] text-neutral-20 md:text-neutral-35 font-bold leading-9 tracking-[-0.6px]">
              Cart Page{" "}
              <span>{`(${cartProducts.length} ${
                cartProducts.length == 1 ? "item" : "items"
              })`}</span>
            </h2>
            <div className="flex items-center justify-end">
              {" "}
              <Location
                myProfile={myProfile?.data}
                isLoading={isLoading}
                isLocationModalOpen={isLocationModalOpen}
                setLocationModalOpen={setLocationModalOpen}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:pag-10 lg:gap-31 my-10">
          {cartProducts?.length < 1 ? (
            <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-4">
              <p className="text-neutral-50 font-medium">No product added</p>
            </div>
          ) : (
            <PaymentProductsCards items={cartProducts} />
          )}
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
