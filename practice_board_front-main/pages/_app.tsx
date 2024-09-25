// /pages/_app.tsx
import { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import MainLayout from "../layout/MainLayout";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "./login";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (!isAuthenticated && router.pathname !== "/auth/login") {
  //     router.push("/auth/login");
  //   }
  // }, [isAuthenticated, router]);

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
      {/* {!isAuthenticated && router.pathname !== "/auth/login" ? (
        <div>로그인 중...</div>
      ) : ( */}
      <MainLayout>
        <Login />
        <Component {...pageProps} />
      </MainLayout>
      {/* )} */}
    </div>
  );
}

function AppWrapper(props: AppProps) {
  return (
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  );
}

export default AppWrapper;
