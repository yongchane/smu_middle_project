import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  // External API URL
  const targetUrl = `http://121.185.8.167:9090/boards`;

  try {
    // Forward request to external API
    const response = await axios({
      method,
      url: targetUrl,
      data: body,
    });

    // Return the data to the client
    res.status(response.status).json(response.data.content); // Send only the 'content' part
  } catch (error: any) {
    // Handle errors
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
