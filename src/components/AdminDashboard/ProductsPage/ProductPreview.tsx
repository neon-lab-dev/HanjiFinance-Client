import React, { useState } from "react";

export type TProduct = {
  productId: string;
  imageUrls: string[];
  name: string;
  description: string;
  clothDetails?: string;
  productStory?: string;
  category: string;
  madeIn?: string;
  sizes: {
    size: string;
    quantity: number;
    basePrice: number;
    discountedPrice: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

type ProductPreviewProps = {
  product: TProduct;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.imageUrls[0] || ""
  );

  return (
    <div className="p-4border rounded-lg shadow-md w-full p-5 mt-5">
      {/* Main Image */}
      <div className="w-full h-full  flex gap-4 items-center justify-center overflow-hidden rounded-md">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full"
          />
        ) : (
          <span className="text-neutral-70">No Image</span>
        )}
        <div>
           {/* Image Thumbnails (max 4) */}
      {product.imageUrls.length > 1 && (
        <div className="flex flex-col gap-2 mt-4">
          {product.imageUrls.slice(0, 4).map((url, index) => (
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
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="mt-2 text-gray-700 line-clamp-2">{product.description}</p>
      </div>

      {/* Price & Sizes */}
      <div className="mt-3">
        {product.sizes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <div
                key={size.size}
                className="border px-2 py-1 rounded text-sm flex flex-col items-center"
              >
                <span className="font-medium">{size.size}</span>
                <span className="line-through text-gray-400 text-xs">
                  ${size.basePrice}
                </span>
                <span className="text-green-600 font-semibold">
                  ${size.discountedPrice}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No sizes available</p>
        )}
      </div>

      {/* Optional Details */}
      {product.madeIn && (
        <p className="mt-3 text-xs text-gray-500">Made in: {product.madeIn}</p>
      )}
    </div>
  );
};

export default ProductPreview;
