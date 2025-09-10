/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { FiFile, FiTablet, FiTrash2 } from "react-icons/fi";
import Table from "../../Reusable/Table/Table";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import Button from "../../Reusable/Button/Button";
import DashboardContainer from "../../Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Dropdown from "../../Reusable/Dropdown/Dropdown";
import SearchInput from "../../Reusable/SearchInput/SearchInput";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import AddLecture from "./AddLecture";

type TCourse = {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
};

const Courses = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isCoursePreviewOpen, setIsCoursePreviewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TCourse | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const navigate= useNavigate()
  
  // Dummy data
  const dummyCourses: TCourse[] = [
    {
      _id: "C001",
      title: "Full Stack Web Development",
      description: "Learn MERN stack with real-world projects.",
      price: 499,
      duration: "12 weeks",
      status: "published",
      createdAt: new Date(),
    },
    {
      _id: "C002",
      title: "UI/UX Design Mastery",
      description: "Become a professional UI/UX designer.",
      price: 299,
      duration: "8 weeks",
      status: "draft",
      createdAt: new Date(),
    },
    {
      _id: "C003",
      title: "Data Structures & Algorithms",
      description: "Crack interviews with advanced problem-solving.",
      price: 199,
      duration: "10 weeks",
      status: "archived",
      createdAt: new Date(),
    },
  ];

  // 1️⃣ Filter + Search
  const filteredCourses = useMemo(() => {
    return dummyCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.description.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter
        ? course.status === statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
  }, [dummyCourses, searchValue, statusFilter]);

  // 2️⃣ Pagination
  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCourses.slice(start, start + pageSize);
  }, [filteredCourses, page, pageSize]);

  // 3️⃣ Table rows
  const allCoursesData = paginatedCourses.map((course) => {
    const statusColors: Record<TCourse["status"], string> = {
      draft: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
      archived: "bg-red-100 text-red-800",
    };

    return {
      _id: course._id,
      title: course.title,
      description: (
        <span title={course.description}>
          {course.description.slice(0, 30)}...
        </span>
      ),
      price: `₹${course.price}`,
      duration: course.duration,
      status: (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColors[course.status]}`}
        >
          {course.status}
        </span>
      ),
      createdAt: course.createdAt.toLocaleDateString(),
    };
  });

  const courseColumns = [
    { key: "_id", label: "Course ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "duration", label: "Duration" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At" },
  ];

  // Actions
  const handleDeleteCourse = (id: string) => {
    toast.success(`Course ${id} deleted (dummy action).`);
  };

  const courseActions = [
    {
      icon: <FiTablet />,
      label: "Update",
      onClick: (row: any) => {
        const course = dummyCourses.find((c) => c._id === row?._id) || null;
       navigate(`/dashboard/admin/add-course`)
       console.log(course)
      },
    },
    {
      icon: <FiFile />,
      label: "manage Lectures",
      onClick: (row: any) => {
        const course = dummyCourses.find((c) => c._id === row?._id) || null;
        setSelectedCourse(course);
        setIsCoursePreviewOpen(true);
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
    if (!filteredCourses || filteredCourses.length === 0) return;

    const exportData = filteredCourses.map((course) => ({
      "Course ID": course._id,
      Title: course.title,
      Description: course.description,
      Price: course.price,
      Duration: course.duration,
      Status: course.status,
      "Created At": course.createdAt.toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
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
                <Dropdown
                  className="py-1 px-3"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "", label: "Select Status" },
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                    { value: "archived", label: "Archived" },
                  ]}
                />
                <Button 
                  variant="primary"
                  onClick={() => {navigate("/dashboard/admin/add-course")
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
            isLoading={false}
            page={page}
            pageSize={pageSize}
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
