import { useForm, useFieldArray } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import Textarea from "../../../components/Reusable/TextArea/TextArea";
import SubscriptionStatus from "../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type TProduct = {
  productId?: string;
  imageUrls: { url: string }[];
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
};

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      imageUrls: [{ url: "" }],
      sizes: [{ size: "", quantity: 0, basePrice: 0, discountedPrice: 0 }],
    },
  });
  const navigate=useNavigate();
  const [previews, setPreviews] = useState<string[]>([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "imageUrls",
  });

  const onSubmit = (data: TProduct) => {
    console.log("Product Data:", data);
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPreviews = [...previews];
      newPreviews[index] = url;
      setPreviews(newPreviews);
    }
  };

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
          {/* Product Name */}
          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            error={errors.name}
            {...register("name", { required: "Product name is required" })}
          />

         

          {/* Cloth Details */}
          <TextInput
            label="Cloth Details"
            placeholder="E.g., Cotton, Polyester"
            error={errors.clothDetails}
            {...register("clothDetails")}
          />
           

          {/* Category */}
          <TextInput
            label="Category"
            placeholder="E.g., Shirts, Jeans"
            error={errors.category}
            {...register("category", { required: "Category is required" })}
          />

          {/* Made In */}
          <TextInput
            label="Made In"
            placeholder="E.g., India"
            error={errors.madeIn}
            {...register("madeIn")}
          />
</div>
{/* Description */}
          <Textarea
            label="Description"
            placeholder="Write product description..."
            rows={4}
            error={errors.description}
            {...register("description", {
              required: "Description is required",
            })}
          />

          {/* Product Story */}
          <Textarea
            label="Product Story"
            placeholder="Tell your product story..."
            rows={4}
            error={errors.productStory}
            {...register("productStory")}
          />
          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">Product Images (max 4)</h3>
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  {...register(`imageUrls.${index}.url` as const, {
                    required: "Image is required",
                  })}
                  className="border rounded-lg p-2"
                  onChange={(e) => handleFileChange(e, index)}
                />

                {/* Show preview */}
                {previews[index] && (
                  <img
                    src={previews[index]}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}

                {imageFields.length > 1 && (
                  <FiTrash2
                    className="cursor-pointer size-5 text-primary-10"
                    onClick={() => {
                      removeImage(index);
                      const newPreviews = previews.filter(
                        (_, i) => i !== index
                      );
                      setPreviews(newPreviews);
                    }}
                  />
                )}
              </div>
            ))}

            {imageFields.length < 4 && (
              <Button
                variant="primary"
                type="button"
                label="Add Image"
                classNames="py-2 px-4"
                onClick={() => appendImage({ url: "" })}
              />
            )}
          </div>

          {/* Sizes Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sizes</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-center justify-center"
              >
                <TextInput
                  label="Size"
                  placeholder="M, L, XL"
                  error={errors.sizes?.[index]?.size}
                  {...register(`sizes.${index}.size` as const, {
                    required: "Size is required",
                  })}
                />

                <TextInput
                  label="Quantity"
                  type="number"
                  error={errors.sizes?.[index]?.quantity}
                  {...register(`sizes.${index}.quantity` as const, {
                    required: "Quantity is required",
                    valueAsNumber: true,
                  })}
                />

                <TextInput
                  label="Base Price"
                  type="number"
                  error={errors.sizes?.[index]?.basePrice}
                  {...register(`sizes.${index}.basePrice` as const, {
                    required: "Base price is required",
                    valueAsNumber: true,
                  })}
                />

                <TextInput
                  label="Discounted Price"
                  type="number"
                  error={errors.sizes?.[index]?.discountedPrice}
                  {...register(`sizes.${index}.discountedPrice` as const, {
                    required: "Discounted price is required",
                    valueAsNumber: true,
                  })}
                />

                <FiTrash2
                  className="cursor-pointer size-20 text-primary-10 mt-5 "
                  onClick={() => remove(index)}
                />
              </div>
            ))}

            <Button
              variant="primary"
              type="button"
              label="Add Size"
              classNames="py-2 px-4"
              onClick={() =>
                append({
                  size: "",
                  quantity: 0,
                  basePrice: 0,
                  discountedPrice: 0,
                })
              }
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="custom" label="Cancel" type="button" classNames="py-2 px-3" onClick={()=>{navigate("/dashboard/admin/products")}}/>
            <Button variant="primary" label="Save Product" type="submit" classNames="py-2 px-3"/>
          </div>
        </form>
      </SubscriptionStatus>s
    </div>
  );
};

export default AddProduct;
