import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nick, setNickName] = useState("");

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const opts = {
      method: "POST", // POST로 수정
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nick, // nickname 추가
        email: email,
        password: password,
      }),
    };

    fetch("https://kscold.store/api/auth/signup", opts)
      .then((resp) => {
        console.log("Response status:", resp.status);
        // 200과 201 둘 다 성공으로 처리
        if (resp.status === 200 || resp.status === 201) {
          return resp.json();
        } else if (resp.status === 409) {
          throw new Error("이미 존재하는 이메일입니다.");
        } else if (resp.status === 500) {
          throw new Error("회원가입에 실패했습니다.");
        } else {
          throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
        }
      })
      .then((data) => {
        console.log("Sign-up success message:", data.message);
        alert("Sign-up successful!");
      })
      .catch((error) => {
        console.error("There was an error!!!!", error);
        alert(`SignUp failed: ${error.message}`);
      });
  };

  return (
    <SignInBox>
      <Link href="/">에브리 타임</Link>
      <SignContainer>
        <SignEmail
          type="text"
          placeholder="nickname"
          value={nick}
          onChange={(e) => setNickName(e.target.value)}
        />
        <SignNick
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SignPassWord
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignBtn onClick={handleClick}>회원가입</SignBtn>
      </SignContainer>
      {/* SignUp 페이지로 이동하는 링크 추가 */}
    </SignInBox>
  );
}
const SignInBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 300px;
`;

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
`;

const SignEmail = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
`;
const SignNick = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
`;

const SignPassWord = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
`;

const SignBtn = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;
