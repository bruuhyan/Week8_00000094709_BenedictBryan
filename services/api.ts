import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getPostDetail = async (id: number) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const getUser = async (userId: number) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};

export const getComments = async (postId: number) => {
  const response = await axios.get(
    `${API_URL}/posts/${postId}/comments`
  );
  return response.data;
};

export const postData = async (data: any) => {
  const response = await axios.post(`${API_URL}/posts`, data);
  return response.data;
};