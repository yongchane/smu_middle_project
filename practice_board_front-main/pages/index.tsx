import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("https://kscold.store/api/auth/signin", opts)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("로그인 실패");
        }
      })
      .then((data) => {
        sessionStorage.setItem("token", data.accessToken); // accessToken 저장
        alert("로그인 성공!");
        router.push(`/main/${data.accessToken}`); // 동적 라우팅에 맞게 수정
      })
      .catch((error) => {
        console.error("오류가 발생했습니다!!!!", error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <LogInBox>
      에브리 타임
      <LoginContainer>
        <LoginEmail
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginPassWord
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginBtn onClick={handleClick}>로그인</LoginBtn>
      </LoginContainer>
      <LogInSignUp>
        <Link href="/signup">회원가입</Link>
      </LogInSignUp>
    </LogInBox>
  );
};

export default Login;

const LogInBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 300px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
`;

const LoginEmail = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
`;

const LoginPassWord = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
`;

const LoginBtn = styled.button`
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

const LogInSignUp = styled.div`
  font-size: 10px;
`;
