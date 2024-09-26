import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

interface Board {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  viewCount: number;
  user: {
    id: number;
    nickname: string;
    email: string;
  };
}

export default function MainContent() {
  const router = useRouter();
  let { token } = router.query; // 쿼리에서 token 가져오기

  if (Array.isArray(token)) {
    token = token[0]; // token이 배열인 경우 첫 번째 값 사용
  }

  const [boards, setBoards] = useState<Board[]>([]); // 게시물 상태 관리

  useEffect(() => {
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.push("/login");
    } else {
      // 토큰이 있을 경우 게시물 요청
      fetch("https://kscold.store/api/boards", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 사용하여 인증
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("게시물 조회 실패");
          }
        })
        .then((data) => {
          setBoards(data); // 받아온 게시물 데이터를 상태에 저장
        })
        .catch((error) => {
          console.error("오류가 발생했습니다!!!!", error);
          alert("게시물 로드에 실패했습니다.");
        });
      console.log(token);
    }
  }, [token]);

  return (
    <MainListContainer>
      <Header token={token} />
      {boards.map((board) => (
        <MainBox
          key={board.id}
          onClick={() =>
            router.push(`/main/contents/${board.id}?token=${token}`)
          } // token과 함께 navigate
        >
          <MainContainerLine>
            <MainTitle>{board.title}</MainTitle>
            <MainCont>{board.content}</MainCont>
            <MainDetail>
              <MainDate>
                작성일: {new Date(board.createdDate).toLocaleString()}
              </MainDate>
              <MainViewCount>| 조회수: {board.viewCount}</MainViewCount>
            </MainDetail>
          </MainContainerLine>
        </MainBox>
      ))}
      <Footer token={token} />
    </MainListContainer>
  );
}

const MainListContainer = styled.div`
  width: 100%;
`;

const MainBox = styled.div`
  width: 100%;
  height: 100px;
`;

const MainContainerLine = styled.div`
  width: 100%;
  height: 1px;
  background: #f4f4f4;
  margin: 5px auto 0 auto;
  cursor: pointer;
`;

const MainTitle = styled.h3`
  margin-left: 2%;
  padding-top: 20px;
`;

const MainCont = styled.div`
  margin-left: 2%;
  padding-top: 5px;
`;

const MainDetail = styled.div`
  margin-left: 2%;
  padding-top: 6px;
  display: flex;
  font-size: 15px;
  color: #bebfc2;
`;

const MainDate = styled.div``;

const MainViewCount = styled.div``;
