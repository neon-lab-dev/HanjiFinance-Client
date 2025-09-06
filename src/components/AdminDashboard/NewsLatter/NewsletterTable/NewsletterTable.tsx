/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEye, FiTrash2, FiCopy } from "react-icons/fi";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import SearchInput from "../../../Reusable/SearchInput/SearchInput";
import Button from "../../../Reusable/Button/Button";
import DashboardContainer from "../../../Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Table from "../../../Reusable/Table/Table";
const NewsletterTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  // Dummy subscribers
  const allEmails = [
    {
      _id: "1",
      name: "Prerna Badwane",
      email: "prerna@example.com",
      joinedDate: "2025-09-01",
    },
    {
      _id: "2",
      name: "John Doe",
      email: "john@example.com",
      joinedDate: "2025-09-02",
    },
    {
      _id: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      joinedDate: "2025-09-03",
    },
    {
      _id: "1",
      name: "Prerna Badwane",
      email: "prerna@example.com",
      joinedDate: "2025-09-01",
    },
    {
      _id: "2",
      name: "John Doe",
      email: "john@example.com",
      joinedDate: "2025-09-02",
    },
    {
      _id: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      joinedDate: "2025-09-03",
    },
    {
      _id: "1",
      name: "Prerna Badwane",
      email: "prerna@example.com",
      joinedDate: "2025-09-01",
    },
    {
      _id: "2",
      name: "John Doe",
      email: "john@example.com",
      joinedDate: "2025-09-02",
    },
    {
      _id: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      joinedDate: "2025-09-03",
    },
  ];

  // Map for table
  const allSubscribersData =
    allEmails.map((s: any) => {
      return {
        _id: s._id,
        name: s.name,
        email: s.email,
        joinedDate: s.joinedDate,
      };
    }) || [];

  const subscriberColumns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "joinedDate", label: "Joined Date" },
  ];

  // Copy single email
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  // Bulk copy emails
  const handleBulkCopy = () => {
    const emails = allEmails.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    toast.success("All emails copied!");
  };

  // Export to Excel
  const handleExportSubscribers = () => {
    if (!allEmails || allEmails.length === 0) return;

    const exportData = allEmails.map((s: any) => {
      const row: Record<string, any> = {};
      subscriberColumns.forEach((col) => {
        row[col.label] = s[col.key] ?? "";
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "subscribers.xlsx");
  };

  const handleDeleteSubscriber = (id: string) => {
    toast.success(`Subscriber ${id} deleted (dummy action).`);
  };

  // Actions
  const subscriberActions = [
    {
      icon: <FiCopy />,
      label: "Copy Email",
      onClick: (row: any) => handleCopyEmail(row?.email),
    },
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => toast(`Viewing ${row?.name}`),
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteSubscriber(row?._id),
      className: "text-red-600",
    },
  ];

  return (
    <div className="mt-6 font-Montserrat">
      <DashboardContainer>
        <div className="font-Montserrat flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-neutral-40">
                Newsletter Subscribers
              </h1>
              <p className="text-neutral-65">
                Manage and export your newsletter subscribers
              </p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {/* Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search by name or email..."
                />
                <Button
                  variant="secondary"
                  onClick={handleBulkCopy}
                  label="Copy All Emails"
                  classNames="w-fit py-2 px-3"
                />
                <Button
                  variant="primary"
                  onClick={handleExportSubscribers}
                  label="Export"
                  classNames="w-fit py-2 px-4"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={subscriberColumns}
            data={allSubscribersData}
            actions={subscriberActions}
            rowKey="_id"
            isLoading={false}
            page={page}
            pageSize={5}
            onPageChange={setPage}
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default NewsletterTable;
