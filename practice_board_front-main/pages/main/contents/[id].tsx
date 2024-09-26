// /pages/main/contents/[id].tsx
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface Board {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    nickname: string;
  };
}

export default function BoardDetail() {
  const router = useRouter();
  const { id, token } = router.query; // 쿼리에서 id와 token 가져오기
  const [board, setBoard] = useState<Board | null>(null); // 선택한 게시물 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    if (!token) {
      router.push("/login"); // 토큰이 없으면 로그인 페이지로 리다이렉트
      return;
    }

    if (id) {
      // id가 있을 경우 게시물 요청
      setLoading(true); // 로딩 시작
      fetch(`https://kscold.store/api/boards/${id}`, {
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
          setBoard(data); // 받아온 게시물 데이터를 상태에 저장
          setLoading(false); // 로딩 종료
        })
        .catch((error) => {
          console.error("오류가 발생했습니다!!!!", error);
          alert("게시물 로드에 실패했습니다.");
          setLoading(false); // 로딩 종료
        });
    }
  }, [id, token]); // 의존성 배열에 id와 token 추가

  if (loading) {
    return <div>로딩 중...</div>; // 게시물이 로드 중일 때 보여줄 내용
  }

  if (!board) {
    return <div>게시물을 찾을 수 없습니다.</div>; // 게시물이 없을 경우 처리
  }

  return (
    <BoardContainer>
      <h1>{board.title}</h1>
      <p>{board.content}</p>
      <p>작성자: {board.user?.nickname || "알 수 없음"}</p>{" "}
      {/* nickname이 없을 경우 "알 수 없음" 표시 */}
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  padding: 20px;
`;
