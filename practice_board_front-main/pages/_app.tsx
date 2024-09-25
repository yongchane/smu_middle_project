// /pages/_app.tsx
import { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import MainLayout from "../layout/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "./login";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // 초기 로드 시 /login으로 리다이렉트
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    router.push("/"); // 로그인 성공 후 메인 페이지로 리다이렉트
  };

  return (
    <div
      style={{
        position: "relative",
        boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <GlobalStyle />
      {isLoggedIn ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <Login onSuccess={handleLoginSuccess} /> // onSuccess prop 전달
      )}
    </div>
  );
}

export default MyApp;
