// /pages/_app.tsx
import { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import MainLayout from "../layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
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

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
}

export default MyApp;
