import { useForm, useFieldArray } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import SubscriptionStatus from "../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import { FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddCourseMutation,
  useGetSingleCourseByIdQuery,
  useUpdateCourseMutation,
} from "../../../redux/Features/Course/courseApi";
import SelectDropdown from "../../../components/Reusable/SelectDropdown/SelectDropdown";
import toast from "react-hot-toast";
import Loader from "../../../components/Shared/Loader/Loader";

export type TFormDate = {
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

const ManageCourseForm = () => {
  const location = useLocation();
  const { id, action } = location.state;
  const { data: singleData, isLoading: isSingleDataLoading } =
    useGetSingleCourseByIdQuery(id);
  const [addCourse, { isLoading: isAddingCourse }] = useAddCourseMutation();
  const [updateCourse, { isLoading: isUpdatingCourse }] =
    useUpdateCourseMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TFormDate>({
    defaultValues: {
      benefits: [{ value: "" }],
    },
  });

  useEffect(() => {
    if (singleData?.data && action === "update") {
      setValue("title", singleData?.data?.title);
      setValue("subtitle", singleData?.data?.subtitle);
      setValue("tagline", singleData?.data?.tagline);
      setValue("benefits", singleData?.data?.benefits);
      setValue("accessType", singleData?.data?.accessType);
      setValue("category", singleData?.data?.category);
      setValue("duration", singleData?.data?.duration);
      setValue("basePrice", singleData?.data?.basePrice);
      setValue("discountedPrice", singleData?.data?.discountedPrice);
    }
  }, [action, singleData, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  const onSubmit = async (data: TFormDate) => {
    console.log("Course Data:", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("tagline", data.tagline);
    formData.append("duration", data.duration);
    data.benefits.forEach((b) => formData.append("benefits[]", b.value));
    formData.append("accessType", data.accessType);
    formData.append("category", data.category);
    formData.append("basePrice", String(data.basePrice));
    formData.append("discountedPrice", String(data.discountedPrice));
    if (data.file?.[0]) formData.append("file", data.file[0]);

    try {
      if (action === "update" && id) {
        const response = await updateCourse({ id, formData }).unwrap();
        if (response?.success) {
          toast.success(response?.message || "Course updated successfully!");
        }
      } else {
        const response = await addCourse(formData).unwrap();
        console.log(response);

        if (response?.success) {
          toast.success(response?.message || "Course added successfully!");
          navigate(
            `/dashboard/admin/course/manage-lectures/${response?.data?.id}`
          );
        }
      }
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  return (
    <div className="font-Montserrat min-h-screen">
      {isSingleDataLoading ? (
        <Loader />
      ) : (
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
                label="Add New Benefit"
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
              <SelectDropdown
                label="Access Type"
                {...register(`accessType`, {
                  required: "Access type is required",
                })}
                error={errors?.accessType}
                options={["Lifetime", "Limited"]}
              />
            </div>
            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Base Price"
                placeholder="Enter base price"
                type="number"
                error={errors.basePrice}
                {...register("basePrice", {
                  required: "Base price is required",
                  valueAsNumber: true,
                })}
              />

              <TextInput
                label="Discounted Price"
                placeholder="Enter discounted price"
                type="number"
                error={errors.discountedPrice}
                {...register("discountedPrice", {
                  required: "Discounted price is required",
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* File Upload */}

            <TextInput
              label="Thumbnail / Preview Image"
              placeholder="Choose file"
              type="file"
              error={errors.file}
              {...register("file", {
                required: "Image is required",
              })}
            />

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
                isLoading={isAddingCourse || isUpdatingCourse}
              />
            </div>
          </form>
        </SubscriptionStatus>
      )}
    </div>
  );
};

export default ManageCourseForm;
