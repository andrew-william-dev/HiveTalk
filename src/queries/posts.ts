import axios from "axios";
import { POST_CONTENT, GET_CONTENT } from "../constants/api/endpoints";

export const createPost = async (args: any) => {
  return axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URL}${POST_CONTENT}`, 
    args,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const getPosts = () => {
  return axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}${GET_CONTENT}`);
};

export const getPostsByUser = (username: string) => {
  return axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URL}${GET_CONTENT}/user`,
    { params: { username } }
  );
};

export const upvotePost = (id: string, username: string) => {
  return axios.put(
    `${import.meta.env.VITE_APP_BACKEND_URL}${GET_CONTENT}/upvote`,
    null,
    { params: { id, username } }
  );
};

export const downvotePost = (id: string, username: string) => {
  return axios.put(
    `${import.meta.env.VITE_APP_BACKEND_URL}${GET_CONTENT}/downvote`,
    null,
    { params: { id, username } }
  );
};

export const getUpvotedPosts = (username: string) => {
  return axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/posts/upvoted`, { params: { username } });
};

export const getDownvotedPosts = (username: string) => {
  return axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/posts/downvoted`, { params: { username } });
};

