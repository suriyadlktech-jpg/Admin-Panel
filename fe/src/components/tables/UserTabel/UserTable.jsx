import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEye, FaBan } from "react-icons/fa";
import UserDetailModal from "../../../components/Pop-UP/userDetailPopUp"; 
import { fetchUsers, blockUser } from "../../../Services/UserServices/userServices.js";
import toast, { Toaster } from "react-hot-toast";

export default function BasicTableOne() {
  const queryClient = useQueryClient();

  // ✅ Fetch users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Block/Unblock mutation
  const blockMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: (data, userId) => {
      // Update local cache immediately
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.map((u) =>
          u.userId === userId ? { ...u, isBlocked: data.isBlocked } : u
        )
      );

      // ✅ Show toast notification
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Action failed");
    },
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load users</p>;
console.log(users)
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Toast container */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader>User</TableCell>
              <TableCell isHeader>Registration Date</TableCell>
              <TableCell isHeader>Subscription Status</TableCell>
              <TableCell isHeader>Online Status</TableCell>
              <TableCell isHeader>Last Active</TableCell>
              <TableCell isHeader>Actions</TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.map((user, idx) => (
              <TableRow key={idx}>
                {/* User Info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img width={40} height={40} src={user.profileAvatar} alt={user.userName} />
                    </div>
                    <div>
                      <span className="block font-medium">{user.userName}</span>
                      <span className="block text-gray-500">{user.role}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Registration Date */}
                <TableCell>
                  {new Date(user.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                {/* Subscription Status */}
                <TableCell>
                  <Badge size="sm" color={user.subscriptionActive ? "success" : "warning"}>
                    {user.subscriptionActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                {/* Online Status */}
                <TableCell
                  className={`text-start rounded-md ${
                    user.isOnline
                      ? "text-green-700 bg-green-100 dark:text-green-500"
                      : "text-red-700 bg-red-100 dark:text-red-500"
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </TableCell>

                {/* Last Active */}
                <TableCell>
                  {user.lastActiveAt
                    ? new Date(user.lastActiveAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Never Active"}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex gap-2">
                    {/* View */}
                    <button
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                      title="View"
                      onClick={() => setSelectedUserId(user.userId)}
                    >
                      <FaEye className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Block/Unblock */}
                    <button
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                      title={user.isBlocked ? "Unblock" : "Block"}
                      onClick={() => blockMutation.mutate(user.userId)}
                      disabled={blockMutation.isLoading}
                    >
                      {user.isBlocked ? (
                        <div className="border border-black pr-2 pl-2  rounded-2xl bg-green-300">Unblock</div> // Unblocked
                      ) : (
                        <FaBan className="w-5 h-5 text-red-500" /> // Blocked
                      )}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Detail Modal */}
      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}
