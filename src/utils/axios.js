import axios from "axios";
import {
  removeDataFromLocalStorage,
  setDataInLocalStorage,
} from "./localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

// Axios middleware for response
axios.interceptors.response.use(
  async (response) => {
    const navigate = useNavigate();

    // check if the we get token expired message and if so then call the generate new accesstoken api endpoint
    if (response.data.message === "The access token is expired") {
      const newAccessTokenResponse = await api.post(
        "/auth/generateAccessToken"
      );
      // if the new access token is generated then store it in the local storage and change the token in header
      if (newAccessTokenResponse.data.status === "success") {
        setDataInLocalStorage("accessToken", newAccessTokenResponse.data.data);

        const originalRequest = response.config;
        originalRequest.headers.Authorization =
          "Bearer " + newAccessTokenResponse.data.data;
        return api(originalRequest);

        // if the new access token failed then remove the existing tokens from local storage and send user to sign in page
      } else if (newAccessTokenResponse.data.status === "error") {
        if (newAccessTokenResponse.data.message === "Refresh Token not found") {
          removeDataFromLocalStorage("accessToken");
          removeDataFromLocalStorage("role");
          removeDataFromLocalStorage("user");
          toast.error(newAccessTokenResponse.data.message);
          navigate("/login");
        }
      }
    } else {
      return response;
    }
  },
  (error) => {
    console.log(error);
  }
);
