import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://devlinks-backend-1.onrender.com/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default newRequest;
