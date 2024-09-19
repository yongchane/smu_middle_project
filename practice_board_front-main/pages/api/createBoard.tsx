import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // 실제 API 서버로 POST 요청을 보내서 게시글을 생성
      const response = await axios.post(
        "http://121.185.8.167:9090/boards",
        req.body
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "게시글 작성 중 오류 발생" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
