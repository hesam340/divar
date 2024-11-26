import axios from "axios";
import { getCookie } from "utils/cookie";

const token = getCookie("accessToken");

const postApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    authorization: `bearer ${token}`,
  },
});

export default postApi;
