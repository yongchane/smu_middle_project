import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Non from "../../assets/header/NonPerson.svg";
import CommentFooter from "../../components/CommentFooter";

// 게시글 데이터 타입 정의
interface Board {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  viewCount: number;
  likeCount: number | null;
}

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  comment: string;
}

type Comments = Comment[];

export default function BoardDetails() {
  const [board, setBoard] = useState<Board | null>(null); // 현재 게시글의 데이터를 저장
  const [comments, setComments] = useState<Comments>([]); // 현재 댓글의 데이터를 저장
  const router = useRouter();
  const { id } = router.query; // URL에서 동적 id 값을 추출

  // 특정 게시글 데이터를 가져오는 함수
  const fetchBoard = async (boardId: string | string[] | undefined) => {
    if (!boardId) return;

    try {
      // 프록시를 통해 API 데이터를 가져옴
      const response = await axios.get(`/api/proxy/${boardId}`);
      setBoard(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  // 특정 댓글 데이터를 가져오는 함수
  const fetchComments = async (boardId: string | string[] | undefined) => {
    if (!boardId) return;

    try {
      // 댓글 API 데이터를 가져옴
      const response = await axios.get(
        `http://121.185.8.167:9090/boards/${boardId}/comments`
      );
      setComments(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error("댓글 API 호출 중 오류 발생:", error);
    }
  };

  // id가 변경될 때마다 데이터를 다시 가져옴
  useEffect(() => {
    if (id) {
      fetchBoard(id); // id 값이 있을 때만 게시글 데이터 가져오기
      fetchComments(id); // id 값이 있을 때만 댓글 데이터 가져오기
    }
  }, [id]);

  // 댓글이 추가된 후 댓글 목록을 새로고침하는 함수
  const handleCommentSubmit = () => {
    if (id) {
      fetchComments(id); // 댓글 작성 후 새로운 댓글 목록 가져오기
    }
  };

  if (!board) {
    return <div>로딩 중...</div>; // 데이터가 로드되기 전 로딩 상태 표시
  }

  return (
    <Container>
      <Title>{board.title}</Title>
      <Content>{board.content}</Content>
      <Detail>
        <CreatedDate>
          작성일: {new Date(board.createdDate).toLocaleString()}
        </CreatedDate>
        <ViewCount>| 조회수: {board.viewCount}</ViewCount>
      </Detail>

      {/* 댓글 목록 표시 */}
      <CommentContainer>
        {comments.length > 0
          ? comments.map((comment) => (
              <ContainerLine key={comment.id}>
                <CommentDetail>
                  <CommentUserContainer>
                    <Non />
                    <CommentUser>익명{comment.id}</CommentUser>
                  </CommentUserContainer>
                  <CommentDetailContent>{comment.comment}</CommentDetailContent>
                </CommentDetail>
              </ContainerLine>
            ))
          : "댓글이 없습니다."}
      </CommentContainer>

      {/* 댓글 작성란 */}
      <CommentFooter onCommentSubmit={handleCommentSubmit} />
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

const CreatedDate = styled.div``;

const ViewCount = styled.div``;

const CommentContainer = styled.div`
  margin-top: 10px;
`;

const CommentDetail = styled.div`
  padding-top: 5px;
`;

const CommentDetailContent = styled.div`
  padding-top: 5px;
  font-size: 18px;
  font-weight: 300;
`;

const CommentUserContainer = styled.div`
  display: flex;
  padding-top: 6px;
  padding-bottom: 4px;
`;

const CommentUser = styled.div`
  padding-top: 7px;
  font-weight: 600;
  padding-left: 9px;
`;

const ContainerLine = styled.div`
  width: 100%;
  height: 1px;
  background: #f4f4f4;
  margin: 5px auto;
`;
