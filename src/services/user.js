import api from "configs/api";
import postApi from "configs/postApi";

const addPost = (formData) => postApi.post("post/create",formData)

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = async () => await api.get("/");

const getPostDetails = (id) => api.get(`post/${id}`)

const deletePost = async (id) => await api.delete(`post/delete/${id}`);

export { getProfile, getPosts, getAllPosts, deletePost, addPost, getPostDetails };
