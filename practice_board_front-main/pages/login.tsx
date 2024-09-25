// /pages/login.tsx
import { SyntheticEvent, useState } from "react";

interface LoginProps {
  onSuccess: () => void; // onSuccess prop의 타입 정의
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  // React.FC를 사용하여 컴포넌트 타입 정의
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        sessionStorage.setItem("token", data.accessToken);
        onSuccess(); // 로그인 성공 시 onSuccess 호출
      })
      .catch((error) => {
        console.error("오류가 발생했습니다!!!!", error);
      });
  };

  return (
    <>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>로그인</button>
    </>
  );
};

export default Login;
