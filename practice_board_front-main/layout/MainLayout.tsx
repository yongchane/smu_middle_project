import React, { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import PageTransition from "../components/PageTransition/PageTransition";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <PageTransition>
        <Main>{children}</Main>
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
