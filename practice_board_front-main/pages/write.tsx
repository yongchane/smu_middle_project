import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Back from "../assets/header/Back.svg";
import { useRouter } from "next/router";

export default function Write() {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const router = useRouter();

  // 폼 제출 처리 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      // API 라우트로 POST 요청을 보내서 게시글을 생성
      const response = await axios.post("/api/createBoard", {
        title,
        content,
        createdDate: new Date().toISOString(), // 현재 날짜와 시간
        viewCount: 0,
        likeCount: 0,
      });

      if (response.status === 201) {
        alert("게시글이 성공적으로 작성되었습니다.");
        setTitle(""); // 제목 초기화
        setContent(""); // 내용 초기화
      }
    } catch (error) {
      console.error("게시글 작성 중 오류 발생:", error);
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <WriteContainer>
          <WriteDeleteIcon onClick={() => router.push("/")}>
            <Back />
          </WriteDeleteIcon>
          <WriteTitle>글 쓰기</WriteTitle>
          <WriteFinishButton type="submit">완료</WriteFinishButton>
        </WriteContainer>
        <InputTitleContainer>
          <StyledInput
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Divider />
        </InputTitleContainer>
        <InputContentContainer>
          <StyledInputContent
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputContentContainer>
      </form>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  width: 100%;
`;

const InputTitleContainer = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const InputContentContainer = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  border: none;
  width: 100%;
  height: 30px;
  font-weight: 600;
  padding: 10px;
  ::placeholder {
    color: #d4d6d9;
  }
`;

const StyledInputContent = styled.textarea`
  border: none;
  width: 100%;
  height: 1000px;
  font-weight: 600;
  resize: none;
  ::placeholder {
    color: #d4d6d9;
  }
  padding: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #f4f4f4;
  margin: 5px auto 0rem auto;
`;

const WriteContainer = styled.div`
  display: flex;
  position: sticky;
  width: 100%;
  height: 50px;
  top: 0;
  background-color: white;
`;

const WriteDeleteIcon = styled.div`
  margin: 12px 38% 0px 15px;
`;

const WriteTitle = styled.div`
  margin-top: 12px;
  font-weight: 600;
`;

const WriteFinishButton = styled.button`
  border: 1px solid red;
  border-radius: 13px;
  width: 40px;
  height: 25px;
  text-align: center;
  background-color: red;
  color: white;
  font-size: 11px;
  font-weight: 700;
  margin-left: 30%;
  margin-top: 10px;
  padding-top: 5px;
  cursor: pointer;
  border: none; /* 버튼의 기본 테두리 제거 */
  outline: none; /* 버튼의 기본 테두리 제거 */

  &:hover {
    background-color: #c00;
  }
`;
