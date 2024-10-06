import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import ReadingGlasses from "../assets/header/ReadingGlasses.svg";
import VericalDot from "../assets/header/VerticalDots.svg";
import Back from "../assets/header/Back.svg";
import GoBack from "../assets/header/GoBack.svg";
import Link from "next/link";
import EditModal from "../pages/modal/edit/EditModal"; // 모달 컴포넌트 가져오기

interface FooterProps {
  token: string | undefined;
}

const Header: React.FC<FooterProps> = ({ token }) => {
  const router = useRouter();
  const ShowBack = router.pathname === "/content";
  const Home = router.pathname === "/";

  // '/main'에 정확히 일치하는지 여부와 '/main/contents/*' 경로 구분
  const isMainPage = router.pathname === "/main";
  const isContentsPage = router.pathname.startsWith("/main/contents");

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderBack onClick={() => router.push(`/main/${token}`)}>
        {ShowBack ? <Back /> : !Home && <GoBack />}
      </HeaderBack>

      <HeaderItem>
        자유게시판
        <HeadersubItem>상명대 천안캠</HeadersubItem>
      </HeaderItem>
      <HeaderBt>
        <Link href={`/search?token=${token}`}>
          <HeaderRG>
            <ReadingGlasses />
          </HeaderRG>
        </Link>
        {/* '/main'에서는 HeaderVD만 렌더링, '/main/contents/*'에서는 클릭 이벤트 포함 */}
        {isMainPage ? (
          <HeaderVD></HeaderVD>
        ) : (
          isContentsPage && (
            <HeaderVD onClick={() => setIsModalOpen(true)}>
              <VericalDot />
            </HeaderVD>
          )
        )}
      </HeaderBt>

      {/* 모달이 열려 있을 때만 렌더링 */}
      {isModalOpen && <EditModal token={token} />}
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
