import { useRouter } from "next/router";
import styled from "styled-components";
import { SyntheticEvent, useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Send from "../../../assets/footer/send.svg";
interface Board {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    nickname: string;
  };
}

interface Comment {
  id: number;
  content: string;
}

export default function BoardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [shocontent, setShocContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  let { token } = router.query;

  if (Array.isArray(token)) {
    token = token[0]; // Handle token as an array (if needed)
  }

  // 게시물 및 댓글 데이터 불러오기
  const fetchBoardAndComments = async () => {
    try {
      setLoading(true);
      const boardResp = await fetch(`https://kscold.store/api/boards/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const commentResp = await fetch(
        `https://kscold.store/api/boards/${id}/comments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!boardResp.ok || !commentResp.ok) {
        throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      const boardData = await boardResp.json();
      const commentData = await commentResp.json();

      setBoard(boardData);
      setComments(commentData);
      setShocContent(boardData.content);
    } catch (error) {
      console.error("오류가 발생했습니다!!!!", error);
      alert("게시물 및 댓글을 로드하는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const opts = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content }),
      };

      const resp = await fetch(
        `https://kscold.store/api/boards/${id}/comments`,
        opts
      );

      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.message || "댓글 작성 실패");
      }

      const newComment = await resp.json();
      setComments([...comments, newComment]);
      setContent("");
    } catch (error) {
      console.error("오류가 발생했습니다!!!!", error);
      alert("댓글 작성 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (id) {
      fetchBoardAndComments();
    }
  }, [id, token]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!board) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <ContentContainer>
      <Header token={token} id={Number(id)} /> {/* id 값을 Header로 전달 */}
      <Container>
        <Title>{board.title}</Title>
        <Content>{board.content}</Content>
        <Detail>
          <CreatedDate>
            작성자: {board.user?.nickname || "알 수 없음"}
          </CreatedDate>
        </Detail>
      </Container>
      {/* 댓글 리스트 */}
      <CommentContainer>
        {comments.length > 0
          ? comments.map((comment) => (
              <ContainerLine key={comment.id}>
                <SubContainerLine />
                <CommentDetail>
                  <CommentUserContainer>
                    <CommentUser>익명{comment.id}</CommentUser>
                  </CommentUserContainer>
                  <CommentDetailContent>{comment.content}</CommentDetailContent>
                </CommentDetail>
              </ContainerLine>
            ))
          : "댓글이 없습니다."}
      </CommentContainer>
      {/* 댓글 작성란 */}
      <InputCommentContainer>
        <InputComment>
          <InputBox
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <SubmitButton onClick={handleClick}>
            <Send />
          </SubmitButton>
        </InputComment>
      </InputCommentContainer>
    </ContentContainer>
  );
}

// 스타일링 코드

const ContentContainer = styled.div`
  height: 100vh; // 전체 뷰포트 높이를 기준으로 설정
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 20%;
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

const CommentContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%; // 고정 높이 유지
  overflow-y: auto; // 스크롤을 활성화하여 높이를 넘는 댓글은 스크롤 가능하도록 설정
  padding-right: 10px; // 스크롤바와 내용 간 여유 공간 추가
`;

// 스타일링 코드 이외의 나머지는 그대로 유지됩니다.

const CommentDetail = styled.div`
  padding-top: 5px;
  height: 100%;
`;

const CommentDetailContent = styled.div`
  padding-top: 5px;
  font-size: 15px;
  font-weight: 400;
  height: 50px;
`;

const CommentUserContainer = styled.div`
  display: flex;
  padding-top: 6px;
  padding-bottom: 4px;
`;

const CommentUser = styled.div`
  padding-top: 7px;
  font-weight: 700;
  font-size: 16px;
  /* padding-left: 9px; */
`;

const ContainerLine = styled.div`
  width: 100%;
  height: 13%;
  margin: 5px auto;
  padding-left: 20px;
`;

const InputCommentContainer = styled.div`
  position: sticky;
  display: flex;
  bottom: 0px;
  width: 100%;
  /* z-index: 1; */
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
  background-color: #ebedf0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
`;
const SubContainerLine = styled.div`
  width: 100%;
  height: 1px;
  background: #f4f4f4;
  margin: 5px auto 0 auto;
  cursor: pointer;
`;
