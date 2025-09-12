import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import type { TProduct } from "../ProductsSection/ProductsSection";
import {
  addToCart,
} from "../../../redux/Features/Cart/cartSlice";
import { useDispatch, } from "react-redux";
type ProductCardProps = {
  item: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const inStock = item.sizes.some((size) => size.quantity > 0);
  const handleAddToWishList = async () => {
    dispatch(addToCart({ product: item, size: item.sizes[0], quantity: 1 }));
  };

  return (
    <div>
      <div
        className={`
          ${inStock ? "bg-neutral-85" : "bg-neutral-105"} 
          rounded-lg h-[270px] lg:h-[429px] overflow-hidden font-Montserrat mt-0 lg:mt-10 relative flex flex-col justify-between`}
      >
        {/* Product header */}
        <div className="absolute top-0 w-full z-20">
          <div className="flex items-center justify-between p-5 w-full">
            <Link
              to={`/product-details/${item._id}`}
              className="text-neutral-50 text-sm md:text-base font-medium leading-[22px] md:leading-6 capitalize hover:underline"
            >
              {item.name}
            </Link>

            <img
              onClick={handleAddToWishList}
              src={ICONS.cartPlus}
              alt="Add to wishlist"
              className="size-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Product image with conditional overlay */}
        <div className="relative w-full h-full">
          {item.imageUrls && item.imageUrls.length > 2 ? (
            <Link to={`/product-details/${item._id}`}>
              <img
                src={item.imageUrls[0]}
                className="h-full w-full rounded-lg object-cover"
                alt={item.name || "Product Image"}
              />
            </Link>
          ) : (
            <img
              src={IMAGES.product}
              className="h-full w-full"
              alt="Placeholder"
            />
          )}

          {/* Show overlay only when not in stock */}
          {!inStock && (
            <div className="absolute bg-neutral-85/50 inset-0 rounded-lg flex items-end justify-center z-10">
              <span className="w-full bg-white/36 p-[10px] text-center text-white text-[17px]  leading-5 font-medium ">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product price */}
      <div className="mt-4">
        <h1 className="text-neutral-10 text-xl font-medium leading-6">
          Rs. {item?.sizes[0]?.basePrice ?? "N/A"}
        </h1>
        <p className="text-neutral-85 text-xs lg:text-base font-normal leading-[22px] mt-2">
          inclusive of all taxes
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
