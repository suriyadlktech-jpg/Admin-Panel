import Api from "../../Utils/axiosApi.js";
import { API_ENDPOINTS } from "../../API-Constanse/apiConstance.js";

// ✅ Fetch all users
export const fetchUsers = async () => {
  const res = await Api.get(API_ENDPOINTS.USER_DETAIL);
  return res.data.users; // backend should return { users: [...] }
};

// ✅ Block a user
export const blockUser = async (userId) => {
  const res = await Api.patch(`${API_ENDPOINTS.USER_BLOCK}/${userId}`);
  return res.data;
};



export const fetchUserById = async (userId) => {
  const res = await Api.get(`${API_ENDPOINTS.GET_INDIVIDUAL_USER_DETAIL}/${userId}`);
  console.log(res.data.user)
  return res.data.user;
};
