/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Dropdown from "../../Reusable/Dropdown/Dropdown";
import Button from "../../Reusable/Button/Button";

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
    <div className="py-5 px-10  shadow-md w-full  font-Montserrat">
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
        <div className="mt-2 flex items-center">
          <label className="mr-2 font-medium">Status:</label>
          <Dropdown
            className="py-1 px-3"
            value={status}
            onChange={(value: string) =>
              handleStatusChange({
                target: { value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Processing", label: "Processing" },
              { value: "Shipped", label: "Shipped" },
              { value: "Delivered", label: "Delivered" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
        </div>
      </div>

      {/* Products List */}
      <div>
        <h3 className="font-semibold mb-2">Products</h3>
        <div className="flex flex-col gap-3">
          {order.products.map((product: TProduct) => (
            <div
              key={product.productId}
              className="flex items-center gap-4 border border-neutral-70 p-2 rounded"
            >
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <div className="flex justify-between gap-[6px] items-center w-fit">
                  {" "}
                  <p className="text-sm text-gray-500">{product.category}</p>|
                  <p className="text-sm">Size: {product.size}</p>|
                  <p className="text-sm">Qty: {product.quantity}</p>
                </div>
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

      <div className="mt-4 border-t flex items-center justify-between pt-3 text-right font-semibold">
        <Button
          variant="primary"
          onClick={() => {}}
          label="Update Status"
          classNames="w-fit self-end py-2 px-4 "
        />
        Total: ${order.totalAmount}
      </div>
    </div>
  );
};

export default OrdersPreview;
