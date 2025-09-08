/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export type TProduct = {
  productId: string;
  imageUrls: string[];
  name: string;
  category: string;
  size: string;
  quantity: number;
  basePrice: number;
  discountedPrice: number;
};

export type IOrder = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
  products: TProduct[];
  totalAmount: number;
};


type OrdersPreviewProps = {
  order: IOrder;
};

const OrdersPreview: React.FC<OrdersPreviewProps> = ({ order }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as IOrder["status"]);
    // later -> call API to update order status
  };

  return (
    <div className="p-5 border rounded-lg shadow-md w-full mt-5 font-Montserrat">
      {/* Order Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Order #{order.orderId}</h2>
        <p className="text-sm text-gray-600">
          Customer: {order.customerName} ({order.customerEmail})
        </p>
        <p className="text-sm text-gray-600">
          Address: {order.customerAddress}
        </p>
        <p className="text-sm text-gray-500">
          Placed on: {order.createdAt.toDateString()}
        </p>

        {/* Status Dropdown */}
        <div className="mt-2">
          <label className="mr-2 font-medium">Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded px-2 py-1"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Products List */}
      <div>
        <h3 className="font-semibold mb-2">Products</h3>
        <div className="flex flex-col gap-3">
          {order.products.map((product:TProduct) => (
            <div
              key={product.productId}
              className="flex items-center gap-4 border p-2 rounded"
            >
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm">Size: {product.size}</p>
                <p className="text-sm">Qty: {product.quantity}</p>
              </div>
              <div className="text-right">
                <p className="line-through text-xs text-gray-400">
                  ${product.basePrice}
                </p>
                <p className="text-success-15 font-semibold">
                  ${product.discountedPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total */}
      <div className="mt-4 border-t pt-3 text-right font-semibold">
        Total: ${order.totalAmount}
      </div>
    </div>
  );
};

export default OrdersPreview;
