import { useRouter } from "next/router";
import styled from "styled-components";
import { SyntheticEvent, useEffect, useState } from "react";
import Header from "../../../layout/Header";

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
  comment: string;
}

export default function BoardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  let { token } = router.query;

  if (Array.isArray(token)) {
    token = token[0]; // Handle token as an array (if needed)
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (id) {
      setLoading(true);
      fetch(`https://kscold.store/api/boards/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
          setBoard(data);
          setComments(data.comments || []); // Assuming comments are in the board data
          setLoading(false);
        })
        .catch((error) => {
          console.error("오류가 발생했습니다!!!!", error);
          alert("게시물 로드에 실패했습니다.");
          setLoading(false);
        });
    }
  }, [id, token]);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const opts = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content, // Assuming the API expects 'content'
      }),
    };

    fetch(`https://kscold.store/api/boards/${id}/comments`, opts)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((data) => {
            throw new Error(data.message || "댓글 작성 실패");
          });
        }
      })
      .then((newComment) => {
        // Update comments with the new comment
        setComments([...comments, newComment]);
        setContent(""); // Clear the input field
      })
      .catch((error) => {
        console.error("오류가 발생했습니다!!!!", error);
        alert("댓글 작성 실패했습니다.");
      });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!board) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Header token={token} />
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
                <CommentDetail>
                  <CommentUserContainer>
                    <CommentUser>익명{comment.id}</CommentUser>
                  </CommentUserContainer>
                  <CommentDetailContent>{comment.comment}</CommentDetailContent>
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
          <SubmitButton onClick={handleClick}>작성</SubmitButton>
        </InputComment>
      </InputCommentContainer>
    </>
  );
}

const BoardContainer = styled.div`
  padding: 20px;
`;

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

const CommentContainer = styled.div`
  margin-top: 10px;
  height: 300px;
`;

const CommentDetail = styled.div`
  padding-top: 5px;
  height: 100%;
`;

const CommentDetailContent = styled.div`
  padding-top: 5px;
  font-size: 18px;
  font-weight: 300;
  height: 50px;
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
  height: 100px;
  background: #f4f4f4;
  margin: 5px auto;
`;

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
