import { SyntheticEvent, useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
      console.log("This is your token", storedToken);
    }
  }, []);

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
        console.log("Response status:", resp.status);
        // 200과 201 둘 다 성공으로 처리
        if (resp.status === 200 || resp.status === 201) {
          return resp.json();
        } else {
          throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
        }
      })
      .then((data) => {
        console.log("This came from the backend:", data);
        if (typeof window !== "undefined" && data.accessToken) {
          sessionStorage.setItem("token", data.accessToken);
          setToken(data.accessToken);
        } else {
          throw new Error("Access token is missing in the response");
        }
      })
      .catch((error) => {
        console.error("There was an error!!!!", error);
        alert(`Login failed: ${error.message}`);
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
      <button onClick={handleClick}>login</button>
    </>
  );
}
