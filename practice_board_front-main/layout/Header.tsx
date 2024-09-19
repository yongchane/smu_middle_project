import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import ReadingGlasses from "../assets/header/ReadingGlasses.svg";
import VericalDot from "../assets/header/VerticalDots.svg";
import Back from "../assets/header/Back.svg";
import GoBack from "../assets/header/GoBack.svg";
const Header = () => {
  const router = useRouter();
  const ShowBack = router.pathname === "/content";
  const Home = router.pathname === "/";
  //   const isActive = (path: string) => router.pathname.startsWith(path);

  return (
    <HeaderContainer>
      <HeaderBack onClick={() => router.push("/")}>
        {ShowBack ? <Back /> : !Home && <GoBack />}
      </HeaderBack>

      <HeaderItem>
        자유게시판
        <HeadersubItem>상명대 천안캠</HeadersubItem>
      </HeaderItem>
      <HeaderBt>
        <HeaderRG onClick={() => router.push("/search")}>
          <ReadingGlasses />
        </HeaderRG>
        <HeaderVD onClick={() => router.push("/menu")}>
          <VericalDot />
        </HeaderVD>
      </HeaderBt>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: sticky;
  text-align: center;
  width: 100%;
  height: 50px;
  top: 0;
  background-color: white;
`;
const HeaderBack = styled.div`
  margin-top: 18px;
  margin-left: 3%;
  width: 20px;
`;

const HeaderItem = styled.div`
  flex-direction: column;
  font-size: 13px;
  width: 100%;
  background-color: white;
  display: flex;
  padding-top: 12px;
  padding-left: 70px;
  /* justify-content: center;
  align-items: center; */
`;

const HeadersubItem = styled.div`
  font-size: 13px;
  color: gray;
`;

const HeaderBt = styled.div`
  margin-right: 5%;
  margin-top: 20px;
  display: flex;
  gap: 30px;
`;

const HeaderRG = styled.div``;

const HeaderVD = styled.div``;
