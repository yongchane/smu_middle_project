import axios from "axios";
import { useState } from "react";
interface Board {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  viewCount: number;
  likeCount: number | null;
  comments: string[];
}
export default function Content() {
  const [boards, setBoards] = useState<Board[]>([]);
  const fetchBoards = async () => {
    try {
      const response = await axios.get("/api/proxy"); // 프록시 API 경로 사용
      setBoards(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("API 호출 중 오류 발생", error);
    }
  };
  return <></>;
}
