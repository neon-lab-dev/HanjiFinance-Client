/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSingleProductByIdQuery } from "../../../redux/Features/Product/productApi";
import Loader from "../../Shared/Loader/Loader";
import { useEffect } from 'react';

const ProductPreview = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useGetSingleProductByIdQuery(productId);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if(data?.data?.imageUrls?.length > 0){
      setSelectedImage(data?.data?.imageUrls[0])
    }
  }, [data?.data])

  return (
    <div className="p-4 rounded-lg shadow-md w-full font-Montserrat">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Main Image */}
          <div className="w-full h-full  flex gap-4 items-center justify-center overflow-hidden rounded-md">
            {
            data?.data?.imageUrls?.length > 0 &&
            data?.data?.imageUrls[0] ? (
              <img
                src={data?.data?.imageUrls[0]}
                alt={data?.data?.name}
                className="w-full h-full rounded-xl"
              />
            ) : (
              <span className="text-neutral-70">No Image</span>
            )}
            <div>
              {data?.data?.imageUrls?.length > 1 && (
                <div className="flex flex-col gap-2 mt-4">
                  {data?.data?.imageUrls
                    ?.slice(0, 4)
                    .map((url: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(url)}
                        className={`w-16 h-16 border rounded overflow-hidden ${
                          selectedImage === url ? "ring-2 ring-blue-500" : ""
                        }`}
                      >
                        <img
                          src={url}
                          alt={`preview-${index}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{data?.data?.name}</h2>
            <p className="text-sm text-gray-600">{data?.data?.category}</p>
            <p className="mt-2 text-gray-700 line-clamp-2">
              {data?.data?.description}
            </p>
          </div>

          {/* Price & Sizes */}
          <div className="mt-3">
            {data?.data?.sizes?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data?.data?.sizes?.map((size: any) => (
                  <div
                    key={size.size}
                    className="border px-2 py-1 gap-4 rounded flex items-center"
                  >
                    <span className="font-medium">{size.size}</span>
                    <div className="">
                      {" "}
                      <div className="line-through text-neutral-65 text-xs">
                        ${size.basePrice}
                      </div>
                      <span className="text-success-15 font-semibold">
                        ${size.discountedPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No sizes available</p>
            )}
          </div>

          {/* Optional Details */}
          {data?.data?.madeIn && (
            <p className="mt-3 text-xs text-gray-500">
              Made in: {data?.data?.madeIn}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPreview;
