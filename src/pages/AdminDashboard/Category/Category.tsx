/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DashboardContainer from "../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import SearchInput from "../../../components/Reusable/SearchInput/SearchInput";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../redux/Features/Category/categoryApi";
import Table from "../../../components/Reusable/Table/Table";
import type { TCategory } from "../../../types/category.types";
import { FiDelete } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../../components/Reusable/Button/Button";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";

type TFormData = {
  name: string;
};

const Category = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isLoading, isFetching } = useGetAllCategoriesQuery({
    page,
    keyword: searchValue,
  });
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();

  const allCategoriesData = data?.data?.categories?.map(
    (category: TCategory) => {
      return {
        _id: category._id,
        name: category.name,
        createdAt: category.createdAt,
        action: (
          <button
            className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs cursor-pointer disabled:cursor-not-allowed"
            onClick={() => handleDeleteCategory(category._id)}
          >
            <FiDelete />
            Remove Category
          </button>
        ),
      };
    }
  );

  const categoryColumns = [
    { key: "_id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "createdAt", label: "Added At" },
    { key: "action", label: "Remove Category" },
  ];

  const handleDeleteCategory = async (id: string) => {
    toast.promise(deleteCategory(id).unwrap(), {
      loading: "Deleting category...",
      success: "Category deleted successfully.",
      error: (err: any) => err?.data?.message || "Something went wrong!",
    });
  };

  const handleAddCategory = async (data: TFormData) => {
    try {
      const payload = {
        name: data.name,
      };
      const response = await addCategory(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        setIsCategoryModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">
                All Categories
              </h1>
              <p className="text-neutral-65">Manage all categories</p>
            </div>

            <div className="flex items-center gap-3">
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search by category name..."
              />
              <Button
                variant={"primary"}
                onClick={() => setIsCategoryModalOpen(true)}
                label={"Add category"}
                classNames="py-2 px-3"
              />
            </div>
          </div>

          {/* Table */}
          <Table
            columns={categoryColumns}
            data={allCategoriesData}
            rowKey="_id"
            isLoading={isLoading || isFetching}
            page={page}
            totalPages={data?.data?.pagination?.totalPages}
            onPageChange={setPage}
          />
        </div>
      </DashboardContainer>

      <ConfirmationModal
        heading=" Add New Category"
        isConfirmationModalOpen={isCategoryModalOpen}
        setIsConfirmationModalOpen={setIsCategoryModalOpen}
        isCrossVisible={true}
      >
        <div className="flex flex-col items-center pb-6 px-8">
          <form
            onSubmit={handleSubmit(handleAddCategory)}
            className="w-full mt-4 flex flex-col items-end"
          >
            <TextInput
              label="Category Name"
              placeholder="Enter category name"
              error={errors.name}
              {...register("name", {
                required: "Category is required",
              })}
            />
            <Button
              type="submit"
              label="Add Category"
              variant="primary"
              classNames="w-fit mt-4 px-3 py-2"
              isLoading={isAddingCategory}
            />
          </form>

          <div className="w-full px-6"></div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default Category;
