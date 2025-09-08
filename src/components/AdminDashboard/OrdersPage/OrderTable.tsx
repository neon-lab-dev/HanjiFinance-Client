/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import Table from "../../Reusable/Table/Table";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import Button from "../../Reusable/Button/Button";
import DashboardContainer from "../../Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Dropdown from "../../Reusable/Dropdown/Dropdown";
import SearchInput from "../../Reusable/SearchInput/SearchInput";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import OrdersPreview, { type IOrder } from "./OrdersPreview";

type TOrder = {
  _id: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
};

const Orders = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isOrderPreviewOpen, setIsOrderPreviewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ✅ Example usage with dummy data


const dummyOrder: IOrder = {
    orderId: "ORD12345",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerAddress: "123 Street, Mumbai, India",
    status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    totalAmount: 2397,
    products: [
      {
        productId: "P1",
        imageUrls: ["https://via.placeholder.com/150"],
        name: "Premium Cotton T-Shirt",
        category: "Clothing",
        size: "M",
        quantity: 2,
        basePrice: 999,
        discountedPrice: 799,
      },
      {
        productId: "P2",
        imageUrls: ["https://via.placeholder.com/150"],
        name: "Denim Jeans",
        category: "Clothing",
        size: "32",
        quantity: 1,
        basePrice: 1599,
        discountedPrice: 1299,
      },
    ],
  };



  // Dummy orders (⚠️ fixed unique IDs)
  const dummyOrders: TOrder[] = [
    {
      _id: "ORD001",
      customerName: "John Doe",
      email: "john@example.com",
      totalAmount: 1500,
      status: "pending",
      createdAt: new Date(),
    },
    {
      _id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      totalAmount: 2300,
      status: "shipped",
      createdAt: new Date(),
    },
    {
      _id: "ORD003",
      customerName: "Amit Sharma",
      email: "amit@example.com",
      totalAmount: 800,
      status: "delivered",
      createdAt: new Date(),
    },
    {
      _id: "ORD004",
      customerName: "Priya Singh",
      email: "priya@example.com",
      totalAmount: 1200,
      status: "processing",
      createdAt: new Date(),
    },
    {
      _id: "ORD005",
      customerName: "David Lee",
      email: "david@example.com",
      totalAmount: 500,
      status: "cancelled",
      createdAt: new Date(),
    },
    {
      _id: "ORD006",
      customerName: "Sophia Patel",
      email: "sophia@example.com",
      totalAmount: 1900,
      status: "delivered",
      createdAt: new Date(),
    },
  ];

  // 1️⃣ Filter + Search (memoized for performance)
  const filteredOrders = useMemo(() => {
    return dummyOrders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.email.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [dummyOrders, searchValue, statusFilter]);

  // 2️⃣ Paginate AFTER filtering
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  // 3️⃣ Format for Table
  const allOrdersData = paginatedOrders.map((order) => {
    const statusColors: Record<TOrder["status"], string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return {
      _id: order._id,
      customerName: order.customerName,
      email: order.email,
      totalAmount: `₹${order.totalAmount}`,
      status: (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      ),
      createdAt: order.createdAt.toLocaleDateString(),
    };
  });

  const orderColumns = [
    { key: "_id", label: "Order ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "email", label: "Email" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Order Date" },
  ];

  // Actions
  const handleDeleteOrder = (id: string) => {
    toast.success(`Order ${id} deleted (dummy action).`);
  };

  const orderActions = [
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => {
        const order = dummyOrders.find((o) => o._id === row?._id) || null;
        setSelectedOrder(order);
        setIsOrderPreviewOpen(true);
      },
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteOrder(row?._id),
      className: "text-red-600",
    },
  ];

  // Export
  const handleExportOrders = () => {
    if (!filteredOrders || filteredOrders.length === 0) return;

    const exportData = filteredOrders.map((order) => ({
      "Order ID": order._id,
      "Customer Name": order.customerName,
      Email: order.email,
      "Total Amount": order.totalAmount,
      Status: order.status,
      "Order Date": order.createdAt.toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "orders.xlsx");
  };

  return (
    <div className="mt-6 font-Montserrat">
      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">Orders</h1>
              <p className="text-neutral-65">Manage customer orders</p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search orders..."
                />
                <Dropdown
                  className="py-1 px-3"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "", label: "Select Status" },
                    { value: "pending", label: "Pending" },
                    { value: "processing", label: "Processing" },
                    { value: "shipped", label: "Shipped" },
                    { value: "delivered", label: "Delivered" },
                    { value: "cancelled", label: "Cancelled" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={orderColumns}
            data={allOrdersData}
            actions={orderActions}
            rowKey="_id"
            isLoading={false}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />

          <Button
            variant="primary"
            onClick={handleExportOrders}
            label="Export"
            classNames="w-fit self-end py-2 px-4"
          />
        </div>
      </DashboardContainer>

      {/* Order Preview Modal */}
      <ConfirmationModal
        isConfirmationModalOpen={isOrderPreviewOpen}
        setIsConfirmationModalOpen={setIsOrderPreviewOpen}
        isCrossVisible={true}
      >
       <OrdersPreview order={dummyOrder} />

      </ConfirmationModal>
    </div>
  );
};

export default Orders;
