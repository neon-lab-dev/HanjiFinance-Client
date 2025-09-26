/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/E-Commerce/ProductDetailsPage/Breadcrumbs/Breadcrumbs";
import ImageCarousel from "../../components/E-Commerce/ProductDetailsPage/ProductCarousel/ImageCarousel";
import Container from "../../components/Reusable/Container/Container";
import { useGetSingleProductByIdQuery } from "../../redux/Features/Product/productApi";
import ProductImages from "../../components/E-Commerce/ProductDetailsPage/productImages/ProductImages";
import { ICONS } from "../../assets";
import { useEffect, useState } from "react";
import ExpandableDescription from "../../components/E-Commerce/ProductDetailsPage/ExpandableDescription/ExpandableDescription";
// import DeliveryOptions from "../../components/E-Commerce/ProductDetailsPage/DeliveryOptions/DeliveryOptions";
import DeliveryDetails from "../../components/E-Commerce/ProductDetailsPage/DeliveryDetails/DeliveryDetails";
import DetailCard from "../../components/E-Commerce/ProductDetailsPage/DetailsCard/DetailCard";
import ProductInfo from "../../components/E-Commerce/ProductDetailsPage/ProductInfo/ProductInfo";
import Button from "../../components/Reusable/Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Features/Cart/cartSlice";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductByIdQuery(id);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: data?.data?.category },
    { label: data?.data?.name },
  ];

  const {
    _id,
    name,
    description,
    imageUrls: images,
    colors = [], // 👈 now comes from API
    clothDetails,
    productStory,
    madeIn,
    productId,
    category,
  } = data?.data || {};

  // State for color + size
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const [selectedProducts, setSelectedProducts] = useState<
    Partial<SelectedProduct>
  >({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (colors && colors.length > 0) {
      const defaultColor = colors[0];
      setSelectedColor(defaultColor);

      // Pick first available size from default color
      const availableSize = defaultColor.sizes.find(
        (size: Size) => size.quantity > 0
      );
      if (availableSize) {
        setSelectedSize(availableSize);
        setSelectedProducts({
          productId: _id,
          name,
          selectedColor: defaultColor.colorName,
          selectedSize: availableSize.size,
          basePrice: availableSize.basePrice,
          discountedPrice: availableSize.discountedPrice,
          image: images?.[0] || ICONS.logo,
        });
      }
    }
  }, [colors, _id, name, images]);

  // Handle Color Selection
  const handleColorClick = (color: any) => {
    setSelectedColor(color);

    const availableSize = color.sizes.find((s: Size) => s.quantity > 0);
    setSelectedSize(availableSize || null);

    setSelectedProducts({
      productId: _id,
      name,
      selectedColor: color.colorName,
      selectedSize: availableSize?.size,
      basePrice: availableSize?.basePrice,
      discountedPrice: availableSize?.discountedPrice,
      image: images?.[0] || ICONS.logo,
    });
  };

  // Handle Size Selection
  const handleSizeClick = (size: any) => {
    if (size.quantity < 1) return; // Prevent selecting out of stock
    setSelectedSize(size);

    setSelectedProducts((prev) => ({
      ...prev,
      selectedSize: size.size,
      basePrice: size.basePrice,
      discountedPrice: size.discountedPrice,
    }));
  };

  interface Size {
    size: string;
    basePrice: number;
    discountedPrice: number;
    quantity: number;
  }

  interface SelectedProduct {
    productId: string | undefined;
    name: string | undefined;
    selectedSize: string;
    basePrice: number;
    discountedPrice: number;
    image: string;
    size: Size;
    selectedColor:string;
  }

const handleAddToWishList = async () => {
  if (!selectedColor || !selectedSize) return;
 
  dispatch(
    addToCart({
      product: data.data,
      color: selectedColor.colorName, // ✅ only string
      size: selectedSize,             // ✅ full size object with _id
      quantity: 1,
    })
  );
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
                <h1 className="text-[28px] md:text-[32px] font-semibold md:font-medium text-neutral-10 leading-normal">
                  Rs. {selectedProducts?.discountedPrice}{" "}
                  <span className="line-through text-sm lg:text-base text-primary-10">
                    Rs. {selectedProducts?.basePrice}
                  </span>
                </h1>
              </div>

              {/* Product description */}
              <div className="mt-5 md:mt-6">
                <ExpandableDescription description={description} />
              </div>

              {/* Colors */}
              <div className="mt-8">
                <h1 className="text-xl font-medium text-neutral-10 leading-normal">
                  Colors
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  {colors?.map((color: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleColorClick(color)}
                      className={`px-4 py-2 rounded-lg border text-lg font-medium transition duration-300
          ${
            selectedColor?.colorName === color.colorName
              ? "bg-primary-30 border-primary-20 text-primary-20"
              : "border-surface-90 text-neutral-20 hover:bg-primary-30"
          }`}
                    >
                      {color.colorName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              {selectedColor && (
                <div className="mt-11 border-b md:border-none border-neutral-185 border-dashed pb-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium text-neutral-10 leading-normal">
                      Sizes
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    {selectedColor?.sizes?.map((size: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleSizeClick(size)}
                        disabled={size.quantity < 1}
                        className={`
            px-4 py-2 rounded-lg border text-lg font-medium transition duration-300
            ${
              selectedSize?.size === size.size
                ? "bg-primary-30 border-primary-20 text-primary-20"
                : size?.quantity < 1
                ? "bg-neutral-85/20 border-neutral-20/50 text-neutral-20/50 cursor-not-allowed"
                : "border-surface-90 text-neutral-20 hover:bg-primary-30"
            }
          `}
                      >
                        {size?.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                  onClick={() => {
                    handleAddToWishList();
                    navigate("/cart");
                  }}
                />
              </div>

              {/* Unlock Freebies */}
              {/* <UnlockFreebies /> */}

              <div className="border-b border-neutral-185 border-dashed pb-6"></div>

              {/* Delivery Options */}
              {/* <DeliveryOptions /> */}

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
                madeIn={madeIn || "India"}
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
