import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserAnalytics } from "../Services/UserServices/userServices";

export default function UserAnalytics() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("feeds");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate=useNavigate();

  // Fetch analytics
  const { data, isLoading, error } = useQuery({
    queryKey: ["userAnalytics", userId],
    queryFn: () => fetchUserAnalytics(userId),
  });

  const tabs = [
    { key: "feeds", label: "Feeds" },
    { key: "following", label: "Following" },
    { key: "interested", label: "Interested Categories" },
    { key: "nonInterested", label: "Non-Interested Categories" },
    { key: "hidden", label: "Hidden Feeds" },
  ];

  if (isLoading) return <p className="p-6">Loading analytics...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading data</p>;

  const dataForActiveTab = data?.[activeTab] || [];
  const totalPages = Math.ceil(dataForActiveTab.length / itemsPerPage);

  const paginatedData = dataForActiveTab.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow mb-6">
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={data?.selectedUser?.userAvatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-xl font-semibold">
            {data?.selectedUser?.userName || "Unknown User"}
          </h2>
        </motion.div>
        <div className="flex space-x-2 mt-4 md:mt-0">
      <motion.button
  className="px-4 py-2 bg-blue-500 text-white rounded"
  whileHover={{ scale: 1.05 }}
  onClick={() => {
    if (userId) navigate(`/referal/tree/page/${userId}`);
  }}
>
  Referrals & Earnings
</motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 -mb-px font-medium text-sm border-b-2 transition-colors duration-300 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + currentPage}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  {activeTab === "hidden" ? (
                    <>
                      <th className="px-4 py-2 border">Category</th>
                      <th className="px-4 py-2 border">Type</th>
                      <th className="px-4 py-2 border">Action</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-2 border">Title</th>
                      <th className="px-4 py-2 border">Description</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, idx) => (
                  <motion.tr
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                  >
                    <td className="px-4 py-2 border">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    {activeTab === "hidden" ? (
                      <>
                        <td className="px-4 py-2 border">{item.category}</td>
                        <td className="px-4 py-2 border">{item.type}</td>
                        <td className="px-4 py-2 border">
                          {item.type === "video" ? (
                            <video
                              src={item.contentUrl}
                              controls
                              className="w-48 h-28 rounded"
                            />
                          ) : (
                            <img
                              src={item.contentUrl}
                              alt={item.category}
                              className="w-48 h-28 object-cover rounded"
                            />
                          )}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 border">{item.title}</td>
                        <td className="px-4 py-2 border">{item.description}</td>
                      </>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-end items-center p-4 space-x-2">
          <motion.button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            Prev
          </motion.button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <motion.button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
}
