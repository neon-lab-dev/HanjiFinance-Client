/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetAllSubscriptionsQuery,
  useUpdateWhatsAppStatusMutation,
} from "../../../redux/Features/BoardroomBanter/boardroomBanterApi";
import type { TBoardRoomBanterSubscription } from "../../../types/boardroomBanter.types";
import { formatDate } from "../../../utils/formatDate";
import { FiPauseCircle, FiUsers, FiUserX } from "react-icons/fi";
import DashboardContainer from "../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import SearchInput from "../../../components/Reusable/SearchInput/SearchInput";
import Dropdown from "../../../components/Reusable/Dropdown/Dropdown";
import Table from "../../../components/Reusable/Table/Table";
import toast from "react-hot-toast";

const ManageSubscriptions = () => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { data, isLoading, isFetching } = useGetAllSubscriptionsQuery({
    keyword: searchValue,
    status: status,
    page: page,
  });

  const allSubscriptions = data?.data
    ?.subscriptions as TBoardRoomBanterSubscription[];

  const [updateWhatsAppStatus] = useUpdateWhatsAppStatusMutation();

  const handleUpdateWhatsAppStatus = async (
    isAdded: boolean,
    userId: string
  ) => {
    try {
      const payload = {
        isAddedToWhatsappGroup: isAdded,
        userId,
      };

      await toast.promise(updateWhatsAppStatus(payload).unwrap(), {
        loading: "Updating status...",
        success: (res: any) => res?.message || "Status updated successfully!",
        error: (err: any) => err?.data?.message || "Something went wrong!",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  const allSubscriptionsData = allSubscriptions
    ?.map((subscription: TBoardRoomBanterSubscription) => {
      const statusColors: Record<string, string> = {
        active: "text-green-600 bg-green-100 border-green-400",
        paused: "text-yellow-600 bg-yellow-100 border-yellow-400",
        expired: "text-red-600 bg-red-100 border-red-400",
        pending: "text-blue-600 bg-blue-100 border-blue-400",
      };

      return {
        _id: subscription._id,
        name: subscription.name,
        email: subscription.email,
        phoneNumber: subscription.phoneNumber,
        date: `${formatDate(subscription.startDate)} - ${formatDate(
          subscription.endDate
        )}`,
        status: (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${
              statusColors[subscription.status]
            }`}
          >
            {subscription.status}
          </span>
        ),
        whatsappGroup: (
          <button
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs cursor-pointer"
            onClick={() =>
              handleUpdateWhatsAppStatus(
                !subscription.isAddedToWhatsappGroup,
                subscription._id
              )
            }
          >
            <FiUsers />
            {subscription.isAddedToWhatsappGroup
              ? "Mark as Removed from Group"
              : "Mark as Added to Group"}
          </button>
        ),
        suspend: (
          <button
            className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs cursor-pointer"
            // onClick={() =>
            //   subscription.isSuspended
            //     ? handleWithdrawSuspension(subscription._id)
            //     : handleSuspend(subscription._id)
            // }
          >
            <FiPauseCircle />
            {subscription.isSuspended
              ? "Mark as Withdrawn Suspension"
              : "Mark as Suspended"}
          </button>
        ),
        remove: (
          <button
            className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs cursor-pointer"
            // onClick={() =>
            //   subscription.isRemoved
            //     ? handleReAdd(subscription._id)
            //     : handleRemove(subscription._id)
            // }
          >
            <FiUserX />
            {subscription.isRemoved ? "Mark as Re-added" : "Mark as Removed"}
          </button>
        ),
        createdAt: subscription.createdAt,
      };
    })
    // Sort by newest first
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  const subscriptionColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "date", label: "Date (Start - End)" },
    { key: "status", label: "Status" },
    { key: "whatsappGroup", label: "WhatsApp Group" },
    { key: "suspend", label: "Suspension" },
    { key: "remove", label: "Remove" },
  ];

  return (
    <div>
      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">
                All Subscriptions
              </h1>
              <p className="text-neutral-65">Manage all subscriptions</p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {/* Filters */}
              <div className="flex items-center flex-wrap">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search by name, email, phone number..."
                />
                <Dropdown
                  className="py-1 px-3 w-60"
                  value={status}
                  onChange={setStatus}
                  options={[
                    { value: "", label: "All Status" },
                    { value: "active", label: "Active" },
                    { value: "paused", label: "Paused" },
                    { value: "expired", label: "Expired" },
                    { value: "pending", label: "Pending" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={subscriptionColumns}
            data={allSubscriptionsData}
            rowKey="_id"
            isLoading={isLoading || isFetching}
            page={page}
            totalPages={data?.data?.pagination?.totalPages}
            onPageChange={setPage}
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ManageSubscriptions;
