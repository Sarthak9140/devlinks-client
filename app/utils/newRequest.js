import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default newRequest;
