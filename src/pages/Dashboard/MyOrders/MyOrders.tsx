/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Button from "../../../components/Reusable/Button/Button";
import MyOrdersCard from "../../../components/Dashboard/MyOrders/MyOrdersCard/MyOrdersCard";
import { useGetMyProductOrdersQuery } from "../../../redux/Features/ProductOrders/productOrdersApi";
import type { TProductOrder } from "../../../types/productOrder.types";
import SearchInput from "../../../components/Reusable/SearchInput/SearchInput";
import Dropdown from "../../../components/Reusable/Dropdown/Dropdown";
import { MdOutlineShoppingBag } from "react-icons/md";
import Loader from "../../../components/Shared/Loader/Loader";
import { useGetMyCourseOrdersQuery } from "../../../redux/Features/CourseOrders/courseOrdersApi";
import type { TCourseOrder } from "../../../types/courseOrder.types";

const MyOrders = () => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const {
    data: myProductOrders,
    isLoading,
    isFetching,
  } = useGetMyProductOrdersQuery({
    page,
    keyword: searchValue,
    status: status,
  });

  const {
    data: myCourseOrders,
    isLoading: isCourseOrdersLoading,
    isFetching: isCourseOrdersFetching,
  } = useGetMyCourseOrdersQuery({
    page,
    keyword: searchValue,
    status: status,
  });

  const allCourseOrders = myCourseOrders?.data?.orders || [];
  const allProductOrders = myProductOrders?.data?.orders || [];
  const [activeTab, setActiveTab] = useState<string>(
    "Fashion & Apparel Orders"
  );
  const pagination =
    activeTab === "Fashion & Apparel Orders"
      ? myProductOrders?.data?.pagination
      : myCourseOrders?.data?.pagination;

  const tabButtons = ["Fashion & Apparel Orders", "Course Orders"];

  return (
    <div>
      <div className="bg-transparent lg:bg-white rounded-2xl space-y-4 mt-6 pb-6">
        <div className="py-0 lg:py-6 px-0 lg:px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-0 border-b-[1px] border-neutral-98">
          <div
            className={`flex items-center gap-3 w-full ${
              activeTab !== "All" ? "ml-0 lg:ml-2" : ""
            }`}
          >
            {tabButtons?.map((tab) => (
              <Button
                variant={activeTab === tab ? "primary" : "secondary"}
                onClick={() => setActiveTab(tab)}
                label={tab}
                classNames="py-2 px-3 text-[13px] md:text-sm"
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-5 lg:gap-1 w-full lg:w-fit items-center">
            {/* Filters */}
            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search by order id..."
            />
            <div className="flex items-center gap-3 w-full">
              {activeTab !== "Course Orders" && (
                <Dropdown
                  className="py-1 px-3 w-60"
                  value={status}
                  onChange={setStatus}
                  options={[
                    { value: "", label: "All Status" },
                    { value: "pending", label: "Pending" },
                    { value: "shipped", label: "Shipped" },
                    { value: "cancelled", label: "Cancelled" },
                  ]}
                />
              )}

              {/* Pagination */}
              {pagination && (
                <div className="flex items-center justify-center gap-2">
                  {/* Prev button */}
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-2 py-2 size-[38px] flex items-center justify-center rounded hover:bg-primary-10 transition duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    &laquo;
                  </button>

                  {/* Page numbers */}
                  {Array.from(
                    { length: pagination.pages },
                    (_, i) => i + 1
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-2 size-[38px] flex items-center justify-center border rounded hover:bg-primary-15 cursor-pointer transition duration-300 ${
                        page === pageNum ? "bg-primary-10 text-white" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next button */}
                  <button
                    disabled={page === pagination.pages}
                    onClick={() =>
                      setPage((p) => Math.min(pagination.pages, p + 1))
                    }
                    className="px-2 py-2 size-[38px] flex items-center justify-center rounded hover:bg-primary-10 transition duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders List / Empty State */}
        {activeTab === "Fashion & Apparel Orders" ? (
          <div className="flex flex-col gap-4 px-0 lg:px-4">
            {isLoading || isFetching ? (
              <div className="py-5">
                <Loader />
              </div>
            ) : allProductOrders.length > 0 ? (
              allProductOrders.map((order: TProductOrder, index: number) => (
                <MyOrdersCard
                  key={index}
                  variant="productOrder"
                  order={order}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center py-20 text-center">
                <MdOutlineShoppingBag className="text-neutral-80 text-8xl" />
                <h3 className="text-lg font-medium text-neutral-100">
                  No orders found
                </h3>
                <p className="text-sm text-neutral-80">
                  Looks like you haven’t placed any orders yet.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-0 lg:px-4">
            {isCourseOrdersLoading || isCourseOrdersFetching ? (
              <div className="py-5">
                <Loader />
              </div>
            ) : allCourseOrders?.length > 0 ? (
              allCourseOrders?.map((order: TCourseOrder) =>
                order?.courses?.map((course: any, index: number) => (
                  <MyOrdersCard
                    key={index}
                    variant="courseOrder"
                    order={order}
                    course={course}
                  />
                ))
              )
            ) : (
              <div className="flex flex-col justify-center items-center py-20 text-center">
                <MdOutlineShoppingBag className="text-neutral-80 text-8xl" />
                <h3 className="text-lg font-medium text-neutral-100">
                  No orders found
                </h3>
                <p className="text-sm text-neutral-80">
                  Looks like you haven’t placed any orders yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
