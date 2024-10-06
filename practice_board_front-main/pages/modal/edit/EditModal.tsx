import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface EditModalProps {
  token: string | undefined;
}
const EditModal: React.FC<EditModalProps> = ({ token }) => {
  const router = useRouter();
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Edit Modal</h2>
        <p>내용을 수정할 수 있습니다.</p>
        <button onClick={() => router.push(`/main/${token}`)}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;
