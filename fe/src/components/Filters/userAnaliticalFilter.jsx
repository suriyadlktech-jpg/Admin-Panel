// src/components/Filters/UserAnalyticsFilter.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function UserAnalyticsFilter({ onFilterChange }) {
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [type, setType] = useState("all"); // options: "all", "image", "video"

  // Only call parent when user clicks Apply
  const handleApply = () => {
    onFilterChange({ startDate, endDate, type });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row items-center gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 px-3 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      <motion.button
        className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg"
        whileHover={{ scale: 1.05 }}
        onClick={handleApply}
      >
        Apply Filter
      </motion.button>
    </div>
  );
}
