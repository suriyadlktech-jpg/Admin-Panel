import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCategories, uploadFeed } from "../../services/uploadService";

export default function FeedUploadForm() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [language, setLanguage] = useState("en");

  // ✅ Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // ✅ Upload Mutation
  const { mutate, isLoading: uploading } = useMutation(uploadFeed, {
    onSuccess: () => {
      alert("Feed uploaded successfully!");
      setFiles([]);
      setSelectedFiles([]);
      setCategoryId("");
    },
    onError: (err) => {
      alert(err.message || "Upload failed");
    },
  });

  const handleFileChange = (e) => {
    const chosenFiles = Array.from(e.target.files);
    setFiles(chosenFiles);
    setSelectedFiles(chosenFiles.map((file) => file.name)); // default select all
  };

  const toggleSelectFile = (fileName) => {
    setSelectedFiles((prev) =>
      prev.includes(fileName)
        ? prev.filter((f) => f !== fileName)
        : [...prev, fileName]
    );
  };

  const handleUpload = () => {
    if (!categoryId) return alert("Please select a category");

    const formData = new FormData();
    formData.append("language", language);
    formData.append("categoryId", categoryId);

    files
      .filter((f) => selectedFiles.includes(f.name))
      .forEach((file) => formData.append("files", file));

    mutate(formData);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Upload Feed
      </h2>

      {/* Category Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Category
      </label>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}

      {/* File Input */}
      <div className="mt-4">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-md file:border file:border-gray-200 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-gray-100 dark:file:border-gray-700 dark:file:bg-gray-800 dark:file:text-gray-300"
        />
      </div>

      {/* Preview */}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {files.map((file) => {
            const isImage = file.type.startsWith("image/");
            const isSelected = selectedFiles.includes(file.name);

            return (
              <div
                key={file.name}
                className={`relative border rounded-md p-2 ${
                  isSelected ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelectFile(file.name)}
                  className="absolute top-2 right-2"
                />
                {isImage ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-24 w-full object-cover rounded"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    className="h-24 w-full object-cover rounded"
                    controls
                  />
                )}
                <p className="mt-1 text-xs truncate text-gray-600 dark:text-gray-400">
                  {file.name}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Feed"}
      </button>
    </div>
  );
}
