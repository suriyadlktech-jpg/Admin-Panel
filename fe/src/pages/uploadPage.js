import { useState } from "react";
import FeedUploadForm from "../components/upload/FeedUploadForm";
import CategoryUploadForm from "../components/upload/CategoryUploadForm";

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="max-w-5xl mx-auto mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "feed"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("feed")}
        >
          Feed Upload
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "category"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("category")}
        >
          Category Upload
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "feed" && <FeedUploadForm />}
        {activeTab === "category" && <CategoryUploadForm />}
      </div>
    </div>
  );
}
