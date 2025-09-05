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

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(2);

  // Dummy data
  const dummyProducts = [
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
    {
      _id: "1",
      name: "T-Shirt",
      category: "Clothing",
      price: 499,
      availableStock: 50,
      status: "available",
    },
  ];

  // Filter + search logic on dummy data
  const filteredProducts = dummyProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Map data for table
  const allProductsData =
    filteredProducts.map((product: any) => {
      const statusColor =
        product.availableStock > 0
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";

      return {
        _id: product._id,
        name: product.name,
        category: product.category, // ✅ add category here
        availableStock: product.availableStock,
        status: (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
          >
            {product.availableStock > 0 ? "Available" : "Out of Stock"}
          </span>
        ),
        price: `₹${product.price}`,
      };
    }) || [];

  const productColumns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "availableStock", label: "Available Stock" },
    { key: "status", label: "Status" },
    { key: "price", label: "Price" },
  ];

  const handleDeleteProduct = (id: string) => {
    toast.success(`Product ${id} deleted (dummy action).`);
  };

  const productActions = [
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => toast(`Editing ${row?.name}`),
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
    if (!filteredProducts || filteredProducts.length === 0) return;

    const exportData = filteredProducts.map((product: any) => {
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
            isLoading={false}
            page={page}
            pageSize={5}
            onPageChange={setPage}
          />
          <Button
            variant="primary"
            onClick={handleExportProducts}
            label="Export"
            classNames="w-fit self-end py-2 px-4 "
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Products;
