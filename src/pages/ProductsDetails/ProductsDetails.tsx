/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/E-Commerce/ProductDetailsPage/Breadcrumbs/Breadcrumbs";
import ImageCarousel from "../../components/E-Commerce/ProductDetailsPage/ProductCarousel/ImageCarousel";
import Container from "../../components/Reusable/Container/Container";
import { useGetSingleProductByIdQuery } from "../../redux/Features/Product/productApi";
import ProductImages from "../../components/E-Commerce/ProductDetailsPage/productImages/ProductImages";
import { ICONS, IMAGES } from "../../assets";
import { useEffect, useState } from "react";
import ExpandableDescription from "../../components/E-Commerce/ProductDetailsPage/ExpandableDescription/ExpandableDescription";
import DeliveryOptions from "../../components/E-Commerce/ProductDetailsPage/DeliveryOptions/DeliveryOptions";
import DeliveryDetails from "../../components/E-Commerce/ProductDetailsPage/DeliveryDetails/DeliveryDetails";
import DetailCard from "../../components/E-Commerce/ProductDetailsPage/DetailsCard/DetailCard";
import ProductInfo from "../../components/E-Commerce/ProductDetailsPage/ProductInfo/ProductInfo";
import Button from "../../components/Reusable/Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Features/Cart/cartSlice";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductByIdQuery(id);
  console.log(data);
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/fashion-and-apparels" },
    { label: "Age Group", link: "/tees/age-group" },
    { label: data?.data?.name },
  ];

  const {
    _id,
    name,
    description,
    imageUrls: images,
    sizes = [],
    clothDetails,
    productStory,
    madeIn,
    productId,
    category,
  } = data?.data || {};

  // State to track selected size and price
  const [selectedSize, setSelectedSize] = useState<any>([]);

  // State to track selected products with sizes
  const [selectedProducts, setSelectedProducts] = useState<
    Partial<SelectedProduct>
  >({});
const dispatch =useDispatch()
const navigate = useNavigate()
  //  Setting the first size product in state automatically befor clicking
  useEffect(() => {
    if (sizes && sizes.length > 0) {
      const firstSize = sizes[0];
      console.log(firstSize);
      setSelectedSize(firstSize);
      setSelectedProducts({
        productId: _id,
        name,
        selectedSize: firstSize.size,
        basePrice: firstSize.basePrice,
        discountedPrice: firstSize.discountedPrice,
        image: images?.[0] || ICONS.logo, // Replace 'ICONS.logo' with an appropriate existing property from ICONS
      });
    }
  }, [sizes, _id, name, images]);

  interface Size {
    size: string;
    basePrice: number;
    discountedPrice: number;
  }

  interface SelectedProduct {
    productId: string | undefined;
    name: string | undefined;
    selectedSize: string;
    basePrice: number;
    discountedPrice: number;
    image: string;
    size:Size;
  }

    const handleAddToWishList = async () => {
      dispatch(addToCart({ product: data.data, size: selectedSize, quantity: 1 }));
    };

  const handleSizeClick = (size: Size) => {
    setSelectedSize(size);

    setSelectedProducts({
      productId: _id,
      name: name,
      selectedSize: size.size,
      basePrice: size.basePrice,
      discountedPrice: size.discountedPrice,
      image: images?.[0] || IMAGES.product,
    } as SelectedProduct);
  };

  // const user = useSelector(useCurrentUser);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No product found</div>;

  return (
    <Container>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div className="font-Montserrat">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Product images for smaller device */}
          <ImageCarousel images={data?.data?.imageUrls} />

          <div className="flex flex-col lg:flex-row gap-9 mt-5 md:mt-8 font-Montserrat">
            {/* Product images for bigger screens */}
            <ProductImages images={data?.data?.imageUrls} />

            {/* Product Details */}
            <div className="w-full lg:w-[40%]">
              {/* Product name */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-[32px] font-bold leading-medium md:leading-12 text-neutral-20 capitalize">
                  {data?.data?.name}
                </h1>

                <img
                  onClick={handleAddToWishList}
                  // src={isInCart ? ICONS.redHeart : IMAGES.heart}
                  src={ICONS.cartPlus}
                  className="cursor-pointer size-5"
                  alt="Heart Icon"
                />
              </div>

              {/* MRP tagline */}
              <p className="text-sm md:text-lg font-medium leading-normal md:leading-[32px] text-neutral-85 mt-5 md:mt-5">
                MRP Inclusive of all taxes
              </p>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mt-[6px]">
                {/* Price */}
                <h1 className="text-[28px] md:text-[32px] font-semibold md:font-medium text-neutral-10 leading-normal">
                  Rs. {selectedProducts?.basePrice}{" "}
                  <span className="line-through text-sm lg:text-base text-primary-10">
                    Rs. {selectedProducts?.discountedPrice}
                  </span>
                </h1>
              </div>

              {/* Product description */}

              <div className="mt-5 md:mt-6">
                <ExpandableDescription description={description} />
              </div>

              {/* Sizes */}
              <div className="mt-11 border-b md:border-none border-neutral-185 border-dashed pb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-medium text-neutral-10 leading-normal">
                    Sizes
                  </h1>
                  
                </div>

                <div className="flex items-center gap-2 mt-6">
                  {/* Sizes card */}
                  {sizes?.map((size: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleSizeClick(size)}
                      className={`${
                        selectedSize.size === size.size
                          ? "bg-primary-30 border-primary-20 text-primary-20"
                          : "border-surface-90 text-neutral-20"
                      } flex h-[56px] px-3 py-2 justify-center items-center gap-3 rounded-lg border text-lg font-medium leading-8 w-full max-w-[103px]`}
                    >
                      {size?.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* buttons */}
              <div className="hidden md:flex items-center gap-[10px] mt-6 pb-6 w-full">
                <Button
                  onClick={handleAddToWishList}
                 
                  variant="custom"
                  label="Add to bag"
                  classNames="border-surface-90 bg-surface-30 w-full text-neutral-10 py-4"
                  icon={ICONS.cartPlus}
                />
                <Button
                  variant="primary"
                  label="Buy Now"
                  classNames="w-full py-4"
                  onClick={()=>{handleAddToWishList()
                    navigate("/cart")
                  }}
                />
              </div>

              {/* Unlock Freebies */}
              {/* <UnlockFreebies /> */}

              <div className="border-b border-neutral-185 border-dashed pb-6"></div>

              {/* Delivery Options */}
              <DeliveryOptions />

              {/* Delivery details */}
              <DeliveryDetails />

              {/* Details cards */}
              <div className="flex flex-col gap-6 mt-6 border-b border-neutral-185 border-dashed pb-6">
                <DetailCard
                  variant="clothDetails"
                  icon={ICONS.fabric}
                  title={"Cloth Details"}
                  description={clothDetails}
                ></DetailCard>

                <DetailCard
                  variant="productStory"
                  icon={ICONS.tshirt}
                  title={"Product Story"}
                  description={productStory}
                ></DetailCard>

                <DetailCard
                  variant="shippingDetails"
                  icon={ICONS.deliveryVan}
                  title={"Shipping Details"}
                  description={
                    "Processed on the same day as the order and shipped within 1-2 days from the date of order. The order should reach your doorstep in 3-4 business days."
                  }
                ></DetailCard>
              </div>

              {/* Product info (Product Code, Collection, Made In) */}
              <ProductInfo
                category={category}
                madeIn={madeIn}
                productCode={productId}
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductsDetails;
