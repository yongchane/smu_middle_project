// lib/axios.tsx
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://121.185.8.167:9090",
  timeout: 10000, // 요청 타임아웃을 설정할 수 있음 (ms 단위)
  headers: {
    "Content-Type": "application/json",
    // 필요에 따라 다른 헤더를 추가
  },
});

export default axiosInstance;
