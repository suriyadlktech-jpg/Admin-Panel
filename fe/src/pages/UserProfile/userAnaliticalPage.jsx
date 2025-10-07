// src/pages/UserAnalytics/UserAnalytics.jsx
import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import UserAnalyticsFilter from "../../components/Filters/userAnaliticalFilter.jsx";
import {
  fetchUserFeeds,
  fetchUserFollowing,
  fetchUserInterested,
  fetchUserNonInterested,
  fetchUserHidden,
  fetchUserLiked,
  fetchUserDisliked,
  fetchUserCommented,
  fetchUserShared,
  fetchUserDownloaded,
} from "../../Services/UserServices/userServices";

export default function UserAnalytics() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("feeds");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    type: "all",
  });

  const itemsPerPage = 10;

  const tabs = useMemo(
    () => [
      { key: "feeds", label: "Feeds" },
      { key: "following", label: "Following" },
      { key: "interested", label: "Interested Categories" },
      { key: "nonInterested", label: "Non-Interested Categories" },
      { key: "hidden", label: "Hidden Feeds" },
      { key: "liked", label: "Liked Feeds" },
      { key: "disliked", label: "Disliked Feeds" },
      { key: "commented", label: "Commented Feeds" },
      { key: "shared", label: "Shared Feeds" },
      { key: "downloaded", label: "Downloaded Feeds" },
    ],
    []
  );

  // Memoize params to prevent unnecessary re-renders
  const stableParams = useMemo(() => {
    const params = {};
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.type && filters.type !== "all") params.type = filters.type;
    return params;
  }, [filters.startDate, filters.endDate, filters.type]);

  // Fetch data for active tab
  const fetchTabData = useCallback(async () => {
    switch (activeTab) {
      case "feeds":
        return fetchUserFeeds(userId, stableParams);
      case "following":
        return fetchUserFollowing(userId, stableParams);
      case "interested":
        return fetchUserInterested(userId, stableParams);
      case "nonInterested":
        return fetchUserNonInterested(userId, stableParams);
      case "hidden":
        return fetchUserHidden(userId, stableParams);
      case "liked":
        return fetchUserLiked(userId, stableParams);
      case "disliked":
        return fetchUserDisliked(userId, stableParams);
      case "commented":
        return fetchUserCommented(userId, stableParams);
      case "shared":
        return fetchUserShared(userId, stableParams);
      case "downloaded":
        return fetchUserDownloaded(userId, stableParams);
      default:
        return [];
    }
  }, [activeTab, userId, stableParams]);

  const queryKey = useMemo(
    () => ["userAnalyticsTab", userId, activeTab, stableParams],
    [userId, activeTab, stableParams]
  );

  const { data: tabData = [], isLoading, error } = useQuery({
    queryKey,
    queryFn: fetchTabData,
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  // Reset page when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filters.startDate, filters.endDate, filters.type]);

  const totalPages = Math.ceil(tabData.length / itemsPerPage);
  const paginatedData = tabData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  if (isLoading)
    return <p className="p-6 text-center">Loading {activeTab} data...</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-500">
        Error loading {activeTab} data
      </p>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filter */}
      <UserAnalyticsFilter
        onFilterChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters }))
        }
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow mb-6">
        <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
          <img
            src={tabData?.selectedUser?.userAvatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-xl font-semibold">
            {tabData?.selectedUser?.userName || "Unknown User"}
          </h2>
        </motion.div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/referal/tree/page/${userId}`)}
          >
            Referrals & Earnings
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="flex border-b border-gray-200 flex-wrap">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab.key)}
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
            key={activeTab + currentPage + JSON.stringify(stableParams)}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <table className="min-w-[600px] md:min-w-full text-left border-collapse border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  {["liked", "disliked", "commented", "shared", "downloaded"].includes(activeTab) ? (
                    <>
                      <th className="px-4 py-2 border">Feed Title</th>
                      <th className="px-4 py-2 border">Action By User</th>
                      <th className="px-4 py-2 border">Date</th>
                    </>
                  ) : activeTab === "hidden" ? (
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
                {paginatedData.length === 0 ? (
                  <tr>
                    <td className="px-4 py-2 border text-center" colSpan={4}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-4 py-2 border">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="px-4 py-2 border">
                        {["liked","disliked","commented","shared","downloaded"].includes(activeTab)
                          ? item.feedTitle || "-"
                          : activeTab === "hidden"
                          ? item.category || "-"
                          : item.title || "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {["liked","disliked","commented","shared","downloaded"].includes(activeTab)
                          ? item.userName || "-"
                          : activeTab === "hidden"
                          ? item.type || "-"
                          : item.description || "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {["liked","disliked","commented","shared","downloaded"].includes(activeTab)
                          ? item.date ? new Date(item.date).toLocaleString() : "-"
                          : activeTab === "hidden"
                          ? item.type === "video"
                            ? <video src={item.contentUrl} controls className="w-48 h-28 rounded" />
                            : <img src={item.contentUrl} alt={item.category} className="w-48 h-28 object-cover rounded" />
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
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
            Page {currentPage} of {totalPages || 1}
          </span>
          <motion.button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
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
