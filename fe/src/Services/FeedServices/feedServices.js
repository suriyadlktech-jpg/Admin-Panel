import Api from "../../Utils/axiosApi.js";
import { API_ENDPOINTS } from "../../API-Constanse/apiConstance.js";




// ✅ Get categories
export async function fetchCategories() {
  try {
    const res = await Api.get(API_ENDPOINTS.ADMIN_GET_CATEGORY);
    console.log(res.data)
    return res.data.categories; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
}

// ✅ Upload Feed
export async function uploadFeed(formData) {
  try {
    const tokenData = localStorage.getItem("admin");
    if (!tokenData) throw new Error("Admin token not found");
console.log(tokenData)
    const  {token}  = JSON.parse(tokenData);
    console.log(token)

    console.log(formData)

    const res = await Api.post(API_ENDPOINTS.ADMIN_UPLOAD_FEED, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Failed to upload feed");
  }
}


export async function deleteFeed(formData) {
  try {
    const tokenData = localStorage.getItem("admin");
    if (!tokenData) throw new Error("Admin token not found");

    const  {token}  = JSON.parse(tokenData);


  

    const res = await Api.post(API_ENDPOINTS. formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Failed to upload feed");
  }
}


// ✅ Add Category
export async function addCategory(data) {
  try {
    console.log(data)
    const res = await Api.post("/admin/add/feed/category", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add category");
  }
}


// ✅ Fetch Feeds
export async function fetchFeeds() {
  try {
    const res = await Api.get(API_ENDPOINTS.ADMIN_GET_ALL_FEED);
    console.log(res.data)
    return res.data.feeds; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch feeds");
  }
}


// ✅ Delete Category
export async function deleteCategory(categoryId) {
  try {
    const res = await Api.delete(`${API_ENDPOINTS.ADMIN_DELETE_CATEGORY}/${categoryId}`);
    return res.data; // 👈 return success info
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete category");
  }
}



export const updateCategory = async ({ id, name }) => {
  try {
    const res = await Api.put(API_ENDPOINTS.ADMIN_UPDATE_CATEGORY, { id, name });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update category");
  }
};



