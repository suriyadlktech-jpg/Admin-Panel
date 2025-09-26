import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import { FaPlay } from "react-icons/fa";

// Sample data
const sampleFeeds = [
  {
    _id: "R001",
    feedUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    createdBy: { avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "John Doe" },
    reportedUser: { avatar: "https://randomuser.me/api/portraits/women/2.jpg", name: "Jane Smith" },
    description: [
      { question: "Why did you report?", answer: "Inappropriate content" },
      { question: "Additional comments?", answer: "Contains sensitive info" },
    ],
  },
  {
    _id: "R002",
    feedUrl: "https://www.w3schools.com/html/movie.mp4",
    createdBy: { avatar: "https://randomuser.me/api/portraits/men/3.jpg", name: "Mike Johnson" },
    reportedUser: { avatar: "https://randomuser.me/api/portraits/women/4.jpg", name: "Alice Brown" },
    description: [{ question: "Why did you report?", answer: "Spam content" }],
  },
  {
    _id: "R003",
    feedUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    createdBy: { avatar: "https://randomuser.me/api/portraits/men/5.jpg", name: "Robert Lee" },
    reportedUser: { avatar: "https://randomuser.me/api/portraits/women/6.jpg", name: "Emily Davis" },
    description: [
      { question: "Why did you report?", answer: "Harassment" },
      { question: "Additional comments?", answer: "Offensive language" },
    ],
  },
];

export default function UserFeedReportTable() {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [videoToPlay, setVideoToPlay] = useState(null);

  const handleStatusChange = (feedId, value) => {
    setSelectedStatus((prev) => ({ ...prev, [feedId]: value }));
  };

  const handleProceed = (feedId) => {
    const status = selectedStatus[feedId];
    console.log("Proceed with feed:", feedId, "Status:", status);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Report ID
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Feed
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Created By
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Reported User
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Description
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {sampleFeeds.map((feed,idx) => (
              <TableRow key={idx}>
                {/* Report ID */}
                <TableCell className="px-5 py-4 text-start text-theme-sm dark:text-white/90">
                  {feed._id}
                </TableCell>

                {/* Feed (Play Icon) */}
                <TableCell className="px-5 py-4 text-center">
                  <FaPlay
                    className="text-blue-500 cursor-pointer hover:text-blue-600 mx-auto"
                    size={18}
                    onClick={() => setVideoToPlay(feed.feedUrl)}
                  />
                </TableCell>

                {/* Created By */}
                <TableCell >
                  <div className="px-5 py-4 flex items-center gap-3 text-theme-sm dark:text-white/90">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img src={feed.createdBy.avatar} alt={feed.createdBy.name} />
                  </div>
                  <span>{feed.createdBy.name}</span>
                  </div>
                </TableCell>

            

                {/* Reported User */}
                <TableCell>
                 <div className="px-5 py-4 flex items-center gap-3 text-theme-sm dark:text-white/90"> 
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img src={feed.reportedUser.avatar} alt={feed.reportedUser.name} />
                  </div>
                  <span>{feed.reportedUser.name}</span>
                  </div>
                </TableCell>

                {/* Description */}
                <TableCell className="px-5 py-4 text-theme-sm dark:text-white/90">
                  {feed.description.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <strong>{item.question}:</strong> {item.answer}
                    </div>
                  ))}
                </TableCell>

                {/* Status */}
                <TableCell className="px-5 py-4 text-theme-sm dark:text-white/90">
                  <select
                    value={selectedStatus[feed._id] || ""}
                    onChange={(e) => handleStatusChange(feed._id, e.target.value)}
                    className="border rounded px-2 py-1 w-full text-sm"
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Action Taken">Action Taken</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </TableCell>

                {/* Actions */}
                <TableCell className="px-5 py-4 text-theme-sm dark:text-white/90">
                  <button
                    disabled={!selectedStatus[feed._id]}
                    onClick={() => handleProceed(feed._id)}
                    className={`px-4 py-2 rounded text-white shadow-sm transition-all ${
                      selectedStatus[feed._id] ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Proceed
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Video Modal */}
      {videoToPlay && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded p-4 relative max-w-lg w-full">
            <button
              onClick={() => setVideoToPlay(null)}
              className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>
            <video src={videoToPlay} controls autoPlay className="w-full h-auto rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
