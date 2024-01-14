import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const apiImage = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
