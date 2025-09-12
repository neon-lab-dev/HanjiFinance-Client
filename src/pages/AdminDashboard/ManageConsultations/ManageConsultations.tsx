/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiLink,
} from "react-icons/fi";
import StatusCard from "../../../components/Dashboard/SharedComponents/StatusCard/StatusCard";
import DashboardContainer from "../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import SearchInput from "../../../components/Reusable/SearchInput/SearchInput";
import Button from "../../../components/Reusable/Button/Button";
import Table from "../../../components/Reusable/Table/Table";
import { useState } from "react";
import { useGetAllConsultationsQuery } from "../../../redux/Features/ChatAndChill/chatAndChillApi";
import type { TConsultation } from "../../../types/consultations.types";
import { formatDate } from "../../../utils/formatDate";
import {} from "react-icons/fi";

const ManageConsultations = () => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { data, isLoading, isFetching } = useGetAllConsultationsQuery({
    keyword: searchValue,
    status: status,
    page: page,
  });

  const allConsultations = data?.data?.bookings as TConsultation[];

  const allConsultationsData = allConsultations?.map(
    (consultation: TConsultation) => {
      // Define status color mapping
      const statusColors: Record<string, string> = {
        booked: "text-blue-600 bg-blue-100 border-blue-400",
        scheduled: "text-purple-600 bg-purple-100 border-purple-400",
        cancelled: "text-red-600 bg-red-100 border-red-400",
        completed: "text-green-600 bg-green-100 border-green-400",
      };

      return {
        _id: consultation._id,
        name: consultation.name,
        email: consultation.email,
        phoneNumber: consultation.phoneNumber,
        bookingDate: formatDate(consultation.bookingDate),
        status: (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${
              statusColors[consultation.status]
            }`}
          >
            {consultation.status}
          </span>
        ),
        meetingLink: (
          <a
            href={consultation.meetingLink}
            target="_blank"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            {consultation?.meetingLink ? (
              <span>
                <FiLink /> Join
              </span>
            ) : (
              "Not Scheduled yet"
            )}
          </a>
        ),
        topicsToDiscuss:
          consultation?.topicsToDiscuss!.length > 15
            ? consultation?.topicsToDiscuss!.slice(0, 15) + "..."
            : consultation.topicsToDiscuss,
      };
    }
  );

  // Columns
  const consultationColumns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "bookingDate", label: "Booking Date" },
    { key: "status", label: "Status" },
    { key: "meetingLink", label: "Meeting Link" },
    { key: "topicsToDiscuss", label: "Topics" },
  ];

  // Actions array
  const consultationActions = [
    {
      icon: <FiLink />,
      label: "Schedule Meeting",
      // onClick: (row: any) => handleScheduleMeeting(row._id),
    },
    {
      icon: <FiCheckCircle />,
      label: "Mark Completed",
      // onClick: (row: any) => handleMarkCompleted(row._id),
      condition: (row: any) =>
        row.status.props.children !== "completed" &&
        row.status.props.children !== "cancelled",
    },

    {
      icon: <FiXCircle />,
      label: "Cancel",
      // onClick: (row: any) => handleCancelConsultation(row._id),
      className: "text-red-600",
      condition: (row: any) =>
        row.status.props.children !== "completed" &&
        row.status.props.children !== "cancelled",
    },
  ];

  const scheduled = allConsultations?.filter(
    (consultation: TConsultation) => consultation.status === "scheduled"
  );
  const completed = allConsultations?.filter(
    (consultation: TConsultation) => consultation.status === "completed"
  );
  const cancelled = allConsultations?.filter(
    (consultation: TConsultation) => consultation.status === "cancelled"
  );
  const todaysConsultations = allConsultations?.filter(
    (consultation: TConsultation) =>
      consultation.status === "scheduled" &&
      consultation.bookingDate === formatDate(new Date())
  );

  const stats = {
    total: allConsultations?.length || 0,
    scheduled: scheduled?.length || 0,
    completed: completed?.length || 0,
    cancelled: cancelled?.length || 0,
    todaysConsultations: todaysConsultations?.length || 0,
  };

  return (
    <div>
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
        {/* Total Consultations */}
        <StatusCard
          icon={<FiCalendar size={28} />}
          value={stats?.total}
          label="Total Consultations"
          badgeText="All"
          badgeBg="bg-blue-100"
          badgeBorder="border-blue-400"
          badgeTextColor="text-blue-600"
        />

        {/* Scheduled Consultations */}
        <StatusCard
          icon={<FiClock size={28} />}
          value={stats?.scheduled}
          label="Scheduled"
          badgeText="Upcoming"
          badgeBg="bg-yellow-100"
          badgeBorder="border-yellow-400"
          badgeTextColor="text-yellow-600"
        />

        {/* Completed Consultations */}
        <StatusCard
          icon={<FiCheckCircle size={28} />}
          value={stats?.completed}
          label="Completed"
          badgeText="Done"
          badgeBg="bg-green-100"
          badgeBorder="border-green-400"
          badgeTextColor="text-green-600"
        />

        {/* Cancelled Consultations */}
        <StatusCard
          icon={<FiXCircle size={28} />}
          value={stats?.cancelled}
          label="Cancelled"
          badgeText="Cancelled"
          badgeBg="bg-red-100"
          badgeBorder="border-red-400"
          badgeTextColor="text-red-600"
        />

        {/* Consultations Today */}
        <StatusCard
          icon={<FiUser size={28} />}
          value={stats?.todaysConsultations}
          label="Today’s Consultations"
          badgeText="Today"
          badgeBg="bg-purple-100"
          badgeBorder="border-purple-400"
          badgeTextColor="text-purple-600"
        />
      </div>

      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">
                All Consultations
              </h1>
              <p className="text-neutral-65">Manage all one-to-one calls</p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search by name, email, phone number..."
                />
                <Button
                  variant="primary"
                  label="Export Data"
                  classNames="py-2 px-3"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={consultationColumns}
            data={allConsultationsData}
            actions={consultationActions}
            rowKey="_id"
            isLoading={isLoading || isFetching}
            page={page}
            totalPages={data?.data?.pagination?.totalPages}
            onPageChange={setPage}
          />

          <Button
            variant="primary"
            // onClick={handleExportCourses}
            label="Export"
            classNames="w-fit self-end py-2 px-4"
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ManageConsultations;
