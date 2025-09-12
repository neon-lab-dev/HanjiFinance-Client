/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiFile, FiTablet, FiTrash2 } from "react-icons/fi";
import Table from "../../Reusable/Table/Table";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import Button from "../../Reusable/Button/Button";
import DashboardContainer from "../../Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import SearchInput from "../../Reusable/SearchInput/SearchInput";
import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "../../../redux/Features/Course/courseApi";
import { formatDate } from "../../../utils/formatDate";
import type { TCourse } from "../../../types/course.types";

const Courses = () => {
    const [deleteCourse] = useDeleteCourseMutation();
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isFetching } = useGetAllCoursesQuery({
    keyword: searchValue,
  });
  const [page, setPage] = useState(1);

  const allCourses = data?.data?.courses || [];

  const navigate = useNavigate();

  // Table rows
  const allCoursesData = allCourses?.map((course:TCourse) => {
    return {
      _id: course._id,
      title: course.title,
      category: course.category,
      accessType: course.accessType,
      price: (
        <>
          <span className="line-through text-gray-400">
            ₹{course.basePrice}
          </span> {" "}
          <span className="text-green-600 font-semibold">
            ₹{course.discountedPrice}
          </span>
        </>
      ),
      duration: course.duration,
      createdAt: formatDate(course?.createdAt),
    };
  });

  const courseColumns = [
    { key: "_id", label: "Course ID" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "accessType", label: "Access Type" },
    { key: "price", label: "Price" },
    { key: "duration", label: "Duration" },
    { key: "createdAt", label: "Created At" },
  ];

  const handleDeleteCourse = async (id: string) => {
      toast.promise(deleteCourse(id).unwrap(), {
        loading: "Deleting course...",
        success: "Course deleted successfully.",
        error: (err: any) => err?.data?.message || "Something went wrong!",
      });
    };

  const courseActions = [
    {
      icon: <FiTablet />,
      label: "Update",
      onClick: (row: any) => {
        navigate(`/dashboard/admin/manage-course`, { state: { id: row?._id, action: "update" } });
      },
    },
    {
      icon: <FiFile />,
      label: "Manage Lectures",
      onClick: (row: any) => {
        navigate(`/dashboard/admin/manage-lectures/${row?._id}`, {
          state: { id: row?._id },
        });
      },
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteCourse(row?._id),
      className: "text-red-600",
    },
  ];

  // Export
const handleExportCourses = () => {
  if (!allCourses || allCourses.length === 0) return;

  const exportData = allCourses.map((course: TCourse) => ({
    "_id": course._id,
    "Image URL": course.imageUrl,
    "Title": course.title,
    "Subtitle": course.subtitle,
    "Tagline": course.tagline,
    "Benefits": course.benefits?.join(", "),
    "Access Type": course.accessType,
    "Category": course.category,
    "Base Price": course.basePrice,
    "Discounted Price": course.discountedPrice,
    "Duration": course.duration || "",
    "Created At": formatDate(course.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "courses.xlsx");
};


  return (
    <div className="mt-6 font-Montserrat">
      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">Courses</h1>
              <p className="text-neutral-65">Manage all courses</p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search courses..."
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/dashboard/admin/manage-course", {
                      state: { action: "add" },
                    });
                  }}
                  label="Add Course"
                  classNames="py-2 px-3"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={courseColumns}
            data={allCoursesData}
            actions={courseActions}
            rowKey="_id"
            isLoading={isLoading || isFetching}
            page={page}
            totalPages={data?.data?.pagination?.totalPages}
            onPageChange={setPage}
          />

          <Button
            variant="primary"
            onClick={handleExportCourses}
            label="Export"
            classNames="w-fit self-end py-2 px-4"
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Courses;
