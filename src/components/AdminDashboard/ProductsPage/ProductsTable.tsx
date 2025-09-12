/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Reusable/Table/Table";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import Button from "../../Reusable/Button/Button";
import { useNavigate } from "react-router-dom";
import DashboardContainer from "../../Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Dropdown from "../../Reusable/Dropdown/Dropdown";
import SearchInput from "../../Reusable/SearchInput/SearchInput";
// import ProductPreview from "./ProductPreview";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import type { TProduct } from "../../../types/product.types";
import { formatDate } from "../../../utils/formatDate";

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    keyword: searchValue,
    page,
  });

  console.log(data);

  const allProducts = data?.data?.products as TProduct[];

  // Map data for table

  const allProductsData =
    allProducts?.map((product: any) => {
      const totalStock = product?.sizes?.reduce(
        (sum: number, size: any) => sum + size?.quantity,
        0
      );

      const statusColor =
        totalStock > 0
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";

      // Price component for each product
      const PriceWithSizes = () => {
        const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

        return (
          <div className="flex items-center gap-2">
            {/* Sizes clickable */}
            <div className="flex gap-2">
              {product.sizes.map((s: any) => (
                <span
                  key={s._id}
                  className={`cursor-pointer underline ${
                    selectedSize.size === s.size
                      ? "font-semibold text-green-600"
                      : ""
                  } ${
                    s.quantity === 0
                      ? "text-red-600 line-through cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => s.quantity > 0 && setSelectedSize(s)}
                >
                  {s.size}
                </span>
              ))}
            </div>

            {/* Price display */}
            <div className="flex items-center gap-2">
              {selectedSize.discountedPrice &&
              selectedSize.discountedPrice < selectedSize.basePrice ? (
                <>
                  <span className="line-through text-gray-400">
                    (₹{selectedSize.basePrice}
                  </span>
                  <span className="text-green-600 font-semibold">
                    ₹{selectedSize.discountedPrice})
                  </span>
                </>
              ) : (
                <span>₹{selectedSize.basePrice}</span>
              )}
            </div>
          </div>
        );
      };

      // Available stock display with commas and 0 in red
      const stockDisplay = product.sizes.map((s: any, idx: number) => (
  <span key={s._id}>
    {s.size}(
    {s.quantity === 0 ? (
      <span className="text-red-600">{s.quantity}</span>
    ) : (
      s.quantity
    )}
    ){idx < product.sizes.length - 1 ? ", " : ""}
  </span>
));


      return {
        image: (
          <img
            src={product.imageUrls?.[0]}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
        ),
        _id: product._id,
        productId: product.productId,
        name: product.name,
        category: product.category,
        createdAt: formatDate(product.createdAt),
        availableStock: <span>{stockDisplay}</span>,
        status: (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
          >
            {totalStock > 0 ? "Available" : "Out of Stock"}
          </span>
        ),
        price: <PriceWithSizes />,
        sizes: product.sizes.map((s: any) => s.size).join(", "),
      };
    }) || [];

  const productColumns = [
    { key: "image", label: "Image" },
    // { key: "_id", label: "ID" },
    { key: "productId", label: "Product ID" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "availableStock", label: "Available Stock" },
    { key: "status", label: "Status" },
    { key: "price", label: "Price" },
    { key: "sizes", label: "Sizes" },
    { key: "createdAt", label: "Added At" },
  ];

  const handleDeleteProduct = (id: string) => {
    toast.success(`Product ${id} deleted (dummy action).`);
  };

  const productActions = [
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => {
        toast(`Viewing ${row?.name}`);
        setIsProductPreviewOpen(true);
      },
    },
    {
      icon: <FiEdit />,
      label: "Update",
      onClick: (row: any) => toast(`Editing ${row?.name}`),
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteProduct(row?._id),
      className: "text-red-600",
    },
  ];

  // Export to Excel (dummy)
  const handleExportProducts = () => {
    if (!allProducts || allProducts?.length === 0) return;

    const exportData = allProducts?.map((product: any) => {
      const row: Record<string, any> = {};
      productColumns.forEach((col) => {
        row[col.label] = product[col.key] ?? "";
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "products.xlsx");
  };

  return (
    <div className="mt-6 font-Montserrat">
      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">Products</h1>
              <p className="text-neutral-65">Manage your products</p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {/* Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search products..."
                />
                <Dropdown
                  className="py-1 px-3"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "", label: "Select Status" },
                    { value: "available", label: "Available" },
                    { value: "unavailable", label: "Unavailable" },
                  ]}
                />

                <Button
                  variant="primary"
                  onClick={() => navigate("/dashboard/admin/add-products")}
                  label="Add Product"
                  classNames="w-fit py-2 px-3 "
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={productColumns}
            data={allProductsData}
            actions={productActions}
            rowKey="_id"
            isLoading={isLoading || isFetching}
            page={page}
            onPageChange={setPage}
            totalPages={data?.data?.pagination?.totalPages}
          />
          <Button
            variant="primary"
            onClick={handleExportProducts}
            label="Export"
            classNames="w-fit self-end py-2 px-4 "
          />
        </div>
      </DashboardContainer>
      <ConfirmationModal
        isConfirmationModalOpen={isProductPreviewOpen}
        setIsConfirmationModalOpen={setIsProductPreviewOpen}
        isCrossVisible={true}
      >
        {/* <ProductPreview product={sampleProduct} /> */}
        <div></div>
      </ConfirmationModal>
    </div>
  );
};

export default Products;
