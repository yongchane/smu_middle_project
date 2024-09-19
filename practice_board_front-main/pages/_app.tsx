import { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import MainLayout from "../layout/MainLayout";
import PageTransition from "../components/PageTransition/PageTransition";

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
      {/* <PageTransition> */}
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      {/* </PageTransition> */}
    </div>
  );
}

export default MyApp;
