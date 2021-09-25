import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  },
  responseType: 'json'
})
export default axiosInstance