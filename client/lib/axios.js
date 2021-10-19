import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "https://naszechoinki.pl/",
  headers: {
    "Content-type": "application/json"
  },
  responseType: 'json'
})
export default axiosInstance