import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import ReadingGlasses from "../assets/header/ReadingGlasses.svg";
import VericalDot from "../assets/header/VerticalDots.svg";
import Back from "../assets/header/Back.svg";
import GoBack from "../assets/header/GoBack.svg";
import Link from "next/link";

interface FooterProps {
  token: string | undefined;
}
const Header: React.FC<FooterProps> = ({ token }) => {
  const router = useRouter();
  const ShowBack = router.pathname === "/content";
  const Home = router.pathname === "/";
  const isContentsPage = router.pathname.startsWith("/main/contents");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("랭킹순");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(true);
  };

  // 드롭다운 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

        {isContentsPage ? (
          <>
            <HeaderVD onClick={toggleDropdown}>
              <VericalDot />
              {isOpen && (
                <SearchDropMenu>
                  <SeachDropItem onClick={() => handleOptionClick("랭킹순")}>
                    랭킹순
                  </SeachDropItem>
                  <SeachLine />
                  <SeachDropItem onClick={() => handleOptionClick("인기순")}>
                    인기순
                  </SeachDropItem>
                </SearchDropMenu>
              )}
            </HeaderVD>
          </>
        ) : (
          <HeaderVD />
        )}
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

const HeaderVD = styled.button`
  background-color: white;
  color: gray;
  border: none;
  cursor: pointer;
`;

const SearchDropMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0; // dropdown을 따라 오른쪽 끝에 위치
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 100px;
  text-align: center;
`;
const SeachDropItem = styled.div`
  padding: 20px 40px;
  cursor: pointer;
`;
const SeachLine = styled.div`
  width: 100%;
  height: 1px;
  background: #cdcdcd;
`;
