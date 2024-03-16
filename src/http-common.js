import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
  },
});
