import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

const CommentFooter = ({
  onCommentSubmit,
}: {
  onCommentSubmit: () => void;
}) => {
  const [newComment, setNewComment] = useState(""); // State for storing the input comment
  const router = useRouter();
  const { id } = router.query; // Get the current content ID

  // Handle comment submission
  const handleSubmit = async () => {
    if (!newComment.trim()) return; // Prevent empty submissions

    try {
      await axios.post(`http://121.185.8.167:9090/boards/${id}/comments`, {
        comment: newComment, // Send the comment as a payload
      });
      setNewComment(""); // Clear input after submission
      onCommentSubmit(); // Call the parent function to refresh the comments
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <InputCommentContainer>
      <InputComment>
        <InputBox
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton onClick={handleSubmit}>작성</SubmitButton>
      </InputComment>
    </InputCommentContainer>
  );
};

export default CommentFooter;

// Styled Components
const InputCommentContainer = styled.div`
  position: sticky;
  display: flex;
  bottom: 10px;
  width: 100%;
  z-index: 10;
  padding: 10px;
`;

const InputComment = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #ebedf0;
  border-radius: 12px;
  border: 1px solid #ebedf0;
  margin: 2px;
`;

const InputBox = styled.input`
  width: 100%;
  border: none;
  background: none;
  outline: none;
  padding: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
`;
