/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFieldArray } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import Textarea from "../../../components/Reusable/TextArea/TextArea";
import SubscriptionStatus from "../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { TProduct } from "../../../types/product.types";
import {
  useAddProductMutation,
  useGetSingleProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/Features/Product/productApi";
import toast from "react-hot-toast";
import Loader from "../../../components/Shared/Loader/Loader";

const AddOrEditProduct = () => {
  
  const location = useLocation();
  const { id, action } = location.state || {};
  const { data: singleProduct, isLoading: productLoading } =
    useGetSingleProductByIdQuery(id);

  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      colors: [
        {
          colorName: "",
          sizes: [{ size: "", quantity: 0, basePrice: 0, discountedPrice: 0 }],
        },
      ],
      imageUrls: [{ file: undefined }],
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  // For each color, we need a field array for sizes
  const sizesFieldArrays = colorFields.map((_, index) =>
    useFieldArray({
      control,
      name: `colors.${index}.sizes` as const,
    })
  );

  useEffect(() => {
    if (singleProduct?.data) {
      setValue("name", singleProduct.data.name);
      setValue("category", singleProduct.data.category);
      setValue("clothDetails", singleProduct.data.clothDetails);
      setValue("madeIn", singleProduct.data.madeIn);
      setValue("description", singleProduct.data.description);
      setValue("productStory", singleProduct.data.productStory);
      setValue(
        "colors",
        singleProduct.data.colors?.length
          ? singleProduct.data.colors
          : [
              {
                colorName: "",
                sizes: [
                  { size: "", quantity: 0, basePrice: 0, discountedPrice: 0 },
                ],
              },
            ]
      );
      if (singleProduct.data.imageUrls?.length) {
        setValue(
          "imageUrls",
          singleProduct.data.imageUrls.map((url: string) => ({ file: url }))
        );
      }
    }
  }, [setValue, singleProduct]);

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "imageUrls",
  });

  const handleSubmitProduct = async (
    data: TProduct & { imageUrls?: { file?: File }[] }
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("category", data.category);
    if (data.clothDetails) formData.append("clothDetails", data.clothDetails);
    if (data.madeIn) formData.append("madeIn", data.madeIn);
    formData.append("description", data.description);
    if (data.productStory) formData.append("productStory", data.productStory);

    data.colors?.forEach((color, colorIndex) => {
      formData.append(`colors[${colorIndex}][colorName]`, color.colorName);
      color.sizes.forEach((size, sizeIndex) => {
        formData.append(
          `colors[${colorIndex}][sizes][${sizeIndex}][size]`,
          size.size
        );
        formData.append(
          `colors[${colorIndex}][sizes][${sizeIndex}][quantity]`,
          size.quantity.toString()
        );
        formData.append(
          `colors[${colorIndex}][sizes][${sizeIndex}][basePrice]`,
          size.basePrice.toString()
        );
        formData.append(
          `colors[${colorIndex}][sizes][${sizeIndex}][discountedPrice]`,
          size.discountedPrice.toString()
        );
      });
    });

    data.imageUrls?.forEach((imgObj) => {
      if (imgObj.file) formData.append("files", imgObj.file);
    });

    try {
      if (action === "update") {
        const response = await updateProduct({ data: formData, id }).unwrap();
        toast.success(
          response?.data?.message || "Product updated successfully!"
        );
        navigate("/dashboard/admin/products");
      } else {
        const response = await addProduct(formData).unwrap();
        toast.success(response?.data?.message || "Product added successfully!");
        navigate("/dashboard/admin/products");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newPreviews = [...previews];
    newPreviews[index] = URL.createObjectURL(file);
    setPreviews(newPreviews);
    setValue(`imageUrls.${index}.file`, file);
  };

  return (
    <div className="font-Montserrat min-h-screen">
      {productLoading ? (
        <Loader />
      ) : (
        <SubscriptionStatus>
          <form
            onSubmit={handleSubmit(handleSubmitProduct)}
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

              {/* Category */}
              <TextInput
                label="Category"
                placeholder="E.g., Shirts, Jeans"
                error={errors.category}
                {...register("category", { required: "Category is required" })}
              />

              {/* Cloth Details */}
              <TextInput
                label="Cloth Details"
                placeholder="E.g., Cotton, Polyester"
                error={errors.clothDetails}
                {...register("clothDetails")}
                isRequired={false}
              />

              {/* Made In */}
              <TextInput
                label="Made In"
                placeholder="E.g., India"
                error={errors.madeIn}
                {...register("madeIn")}
                isRequired={false}
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
              isRequired={false}
            />
            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">
                Product Images (max 4)
              </h3>
              {imageFields.map((field, index) => {
                // decide which preview to show: existing DB URL or new file preview
                const existingUrl =
                  typeof field?.file === "string" ? field.file : undefined;
                const previewUrl = previews[index] || existingUrl;

                return (
                  <div key={field.id} className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      className="border rounded-lg p-2"
                      onChange={(e) => handleFileChange(e, index)}
                    />

                    {/* Show preview */}
                    {previewUrl && (
                      <img
                        src={previewUrl}
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
                );
              })}

              {imageFields.length < 4 && (
                <Button
                  variant="primary"
                  type="button"
                  label="Add Image"
                  classNames="py-2 px-4"
                  onClick={() => appendImage({ file: undefined })}
                />
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Colors & Sizes</h3>

              {colorFields.map((color, colorIndex) => {
                const {
                  fields: sizeFields,
                  append: appendSize,
                  remove: removeSize,
                } = sizesFieldArrays[colorIndex];

                return (
                  <div
                    key={color.id}
                    className="border p-4 rounded-md space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <TextInput
                        label="Color Name"
                        placeholder="Black, White"
                        error={errors.colors?.[colorIndex]?.colorName}
                        {...register(
                          `colors.${colorIndex}.colorName` as const,
                          {
                            required: "Color name is required",
                          }
                        )}
                      />
                      <FiTrash2
                        className="cursor-pointer text-primary-10 mt-5"
                        onClick={() => removeColor(colorIndex)}
                      />
                    </div>

                    <div className="space-y-2">
                      {sizeFields.map((size, sizeIndex) => (
                        <div key={size.id} className="flex gap-4 items-center">
                          <TextInput
                            label="Size"
                            placeholder="M, L, XL"
                            error={
                              errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
                                ?.size
                            }
                            {...register(
                              `colors.${colorIndex}.sizes.${sizeIndex}.size` as const,
                              { required: "Size is required" }
                            )}
                          />
                          <TextInput
                            label="Quantity"
                            type="number"
                            error={
                              errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
                                ?.quantity
                            }
                            {...register(
                              `colors.${colorIndex}.sizes.${sizeIndex}.quantity` as const,
                              {
                                required: "Quantity is required",
                                valueAsNumber: true,
                              }
                            )}
                          />
                          <TextInput
                            label="Base Price"
                            type="number"
                            error={
                              errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
                                ?.basePrice
                            }
                            {...register(
                              `colors.${colorIndex}.sizes.${sizeIndex}.basePrice` as const,
                              {
                                required: "Base price is required",
                                valueAsNumber: true,
                              }
                            )}
                          />
                          <TextInput
                            label="Discounted Price"
                            type="number"
                            error={
                              errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
                                ?.discountedPrice
                            }
                            {...register(
                              `colors.${colorIndex}.sizes.${sizeIndex}.discountedPrice` as const,
                              {
                                required: "Discounted price is required",
                                valueAsNumber: true,
                              }
                            )}
                          />
                          <FiTrash2
                            className="cursor-pointer text-primary-10 mt-5"
                            onClick={() => removeSize(sizeIndex)}
                          />
                        </div>
                      ))}

                      <Button
                        variant="primary"
                        type="button"
                        label="Add Size"
                        classNames="py-2 px-4"
                        onClick={() =>
                          appendSize({
                            size: "",
                            quantity: 0,
                            basePrice: 0,
                            discountedPrice: 0,
                          })
                        }
                      />
                    </div>
                  </div>
                );
              })}

              <Button
                variant="primary"
                type="button"
                label="Add Color"
                classNames="py-2 px-4"
                onClick={() =>
                  appendColor({
                    colorName: "",
                    sizes: [
                      {
                        size: "",
                        quantity: 0,
                        basePrice: 0,
                        discountedPrice: 0,
                      },
                    ],
                  })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                variant="custom"
                label="Cancel"
                type="button"
                classNames="py-2 px-3"
                onClick={() => {
                  navigate("/dashboard/admin/products");
                }}
              />
              <Button
                variant="primary"
                label="Save Product"
                type="submit"
                classNames="py-2 px-3"
                isLoading={isLoading || isUpdating}
              />
            </div>
          </form>
        </SubscriptionStatus>
      )}
    </div>
  );
};

export default AddOrEditProduct;
