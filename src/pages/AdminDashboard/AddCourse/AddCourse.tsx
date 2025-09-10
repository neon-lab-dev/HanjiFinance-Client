import { useForm, useFieldArray } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import SubscriptionStatus from "../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type TCourse = {
  title: string;
  subtitle: string;
  tagline: string;
  benefits: { value: string }[];
  accessType: "lifetime" | "subscription";
  category: string;
  duration: string;
  basePrice: number;
  discountedPrice: number;
  file?: FileList;
};

const AddCourse = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCourse>({
    defaultValues: {
      benefits: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  const onSubmit = (data: TCourse) => {
    console.log("Course Data:", data);

    // ✅ Later: make FormData for API call
    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("subtitle", data.subtitle);
    // formData.append("tagline", data.tagline);
    // data.benefits.forEach(b => formData.append("benefits[]", b.value));
    // formData.append("accessType", data.accessType);
    // formData.append("category", data.category);
    // formData.append("duration", data.duration);
    // formData.append("basePrice", String(data.basePrice));
    // formData.append("discountedPrice", String(data.discountedPrice));
    // if (data.file?.[0]) formData.append("file", data.file[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
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
            {/* Title */}
            <TextInput
              label="Course Title"
              placeholder="Enter course title"
              error={errors.title}
              {...register("title", { required: "Title is required" })}
            />

            {/* Subtitle */}
            <TextInput
              label="Subtitle"
              placeholder="Enter course subtitle"
              error={errors.subtitle}
              {...register("subtitle", { required: "Subtitle is required" })}
            />

            {/* Tagline */}
            <TextInput
              label="Tagline"
              placeholder="Catchy one-liner"
              error={errors.tagline}
              {...register("tagline", { required: "Tagline is required" })}
            />

            {/* Category */}
            <TextInput
              label="Category"
              placeholder="E.g., Web Development"
              error={errors.category}
              {...register("category", { required: "Category is required" })}
            />
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="font-semibold">Benefits</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <TextInput
                  placeholder="Benefit"
                  error={errors.benefits?.[index]?.value}
                  {...register(`benefits.${index}.value` as const, {
                    required: "Benefit is required",
                  })}
                />
                {fields.length > 1 && (
                  <FiTrash2
                    className="cursor-pointer size-5 text-primary-10"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="primary"
              label="Add Benefit"
              classNames="py-2 px-4"
              onClick={() => append({ value: "" })}
            />
          </div>
<div className="grid grid-cols-2 gap-4">
          {/* Duration */}
          <TextInput
            label="Duration"
            placeholder="E.g., 12h 30m"
            error={errors.duration}
            {...register("duration", { required: "Duration is required" })}
          />

          {/* Access Type */}
          <div>
            <label className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">Access Type</label>
            <select
              {...register("accessType", { required: "Access type is required" })}
              className={`w-full px-4 py-[14px] rounded-lg bg-white border-2 leading-[18px] focus:outline-none transition duration-300 border-neutral-95`}
            >
              <option value="lifetime">Lifetime</option>
              <option value="subscription">Subscription</option>
            </select>
            {errors.accessType && (
              <span className="text-red-500 text-sm">
                {errors.accessType.message}
              </span>
            )}
          </div>
</div>
          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Base Price"
              type="number"
              error={errors.basePrice}
              {...register("basePrice", {
                required: "Base price is required",
                valueAsNumber: true,
              })}
            />

            <TextInput
              label="Discounted Price"
              type="number"
              error={errors.discountedPrice}
              {...register("discountedPrice", {
                required: "Discounted price is required",
                valueAsNumber: true,
              })}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="font-medium">Thumbnail / Preview Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("file", { required: "Thumbnail is required" })}
              className="border rounded-lg p-2 w-full mt-1"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 rounded border"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="custom"
              label="Cancel"
              type="button"
              classNames="py-2 px-3"
              onClick={() => navigate("/dashboard/admin/courses")}
            />
            <Button
              variant="primary"
              label="Save Course"
              type="submit"
              classNames="py-2 px-3"
            />
          </div>
        </form>
      </SubscriptionStatus>
    </div>
  );
};

export default AddCourse;
