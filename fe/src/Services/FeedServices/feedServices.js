import Api from "../../Utils/axiosApi.js";
import { API_ENDPOINTS } from "../../API-Constanse/apiConstance.js";
// ✅ Get categories
export async function fetchCategories() {
  try {
    const res = await Api.get("");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
}

// ✅ Upload Feed
export async function uploadFeed(formData) {
  try {
    const res = await Api.post(API_ENDPOINTS.ADMIN_UPLOAD_FEED, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload feed");
  }
}

// ✅ Add Category
export async function addCategory(data) {
  try {
    const res = await Api.post("/api/admin/add-category", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add category");
  }
}
