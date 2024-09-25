import { SyntheticEvent, useState } from "react";

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
    <>
      <input
        type="text"
        placeholder="nickname"
        value={nick}
        onChange={(e) => setNickName(e.target.value)}
      />
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
      <button onClick={handleClick}>Sign up</button>
    </>
  );
}
