import React, { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import SearchHeader from "../components/SearchHeader";
// import WriteHeader from "../components/WriteHeader";
import PageTransition from "../components/PageTransition/PageTransition";
import CommentFooter from "../components/CommentFooter";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  // 특정 경로에서는 Header와 Footer 렌더링 안 함
  const hideHeader =
    router.pathname === "/search" || router.pathname === "/write";
  const showSearchHeader = router.pathname === "/search";
  const showWriteHeader = router.pathname === "/write";
  const hideFooter = router.pathname === "/";
  const commentFooter =
    router.pathname === "/" ||
    router.pathname === "/write" ||
    router.pathname === "/search";

  return (
    <>
      <PageTransition>
        {showSearchHeader ? <SearchHeader /> : !hideHeader ? <Header /> : null}

        <Main>{children}</Main>
        {hideFooter ? <Footer /> : !commentFooter && <CommentFooter />}
        {/* // : !commentFooter && <CommentFooter /> */}
      </PageTransition>
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  margin: 0 auto;
  min-height: calc(100vh - 50px);

  height: 100%;
  @media (min-width: 375px) {
    width: 430px;
  }
  @media (max-width: 500px) {
    width: 100vw;
  }
`;
