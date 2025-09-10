import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import SubscriptionStatus from "../../../components/Dashboard/SubscriptionStatus/SubscriptionStatus";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type TLecture = {
  title: string;
  duration: string;
  description: string;
  video?: FileList;
};

const AddLecture = () => {
  const navigate = useNavigate();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLecture>();

  const onSubmit = (data: TLecture) => {
    console.log("Lecture Data:", data);

    // ✅ Later: convert to FormData for API call
    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("duration", data.duration);
    // formData.append("description", data.description);
    // if (data.video?.[0]) formData.append("video", data.video[0]);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  return (
    <div className="font-Montserrat">
      <SubscriptionStatus>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6 w-full"
        >
          {/* Lecture Title */}
          <TextInput
            label="Lecture Title"
            placeholder="Enter lecture title"
            error={errors.title}
            {...register("title", { required: "Title is required" })}
          />

          {/* Duration */}
          <TextInput
            label="Duration"
            placeholder="E.g., 15m"
            error={errors.duration}
            {...register("duration", { required: "Duration is required" })}
          />

          {/* Description */}
          <TextInput
            label="Description"
            placeholder="Brief about the lecture"
            error={errors.description}
            {...register("description", { required: "Description is required" })}
          />

          {/* Video Upload */}
          <div>
            <label className="font-medium">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              {...register("video", { required: "Video file is required" })}
              className="border rounded-lg p-2 w-full mt-1"
              onChange={handleVideoChange}
            />
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="w-48 h-32 object-cover mt-2 rounded border"
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
              onClick={() => navigate("/dashboard/admin/lectures")}
            />
            <Button
              variant="primary"
              label="Save Lecture"
              type="submit"
              classNames="py-2 px-3"
            />
          </div>
        </form>
      </SubscriptionStatus>
    </div>
  );
};

export default AddLecture;
