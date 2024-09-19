import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MainContent from "../components/MainContent";

interface Board {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  viewCount: number;
}

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchBoards = async () => {
    try {
      const response = await axios.get("/api/proxy"); // API proxy route
      setBoards(response.data); // Set the boards state
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards(); // Fetch boards on component mount
  }, []);

  return <MainContent boards={boards} />;
}
