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
  id: number;
}

const Header: React.FC<FooterProps> = ({ token, id }) => {
  const router = useRouter();
  const ShowBack = router.pathname === "/content";
  const Home = router.pathname === "/";
  const isContentsPage = router.pathname.startsWith("/main/contents");
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    // 게시글 ID 또는 토큰이 없으면 요청을 보내지 않도록 확인
    if (!id) {
      alert("유효한 게시글 ID가 없습니다.");
      return;
    }

    if (!token) {
      alert("유효한 토큰이 없습니다. 다시 로그인해 주세요.");
      return;
    }

    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`https://kscold.store/api/boards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "게시글 삭제에 실패했습니다.");
      }

      const data = await response.json();
      alert(data.message); // "게시글이 삭제되었습니다." 메시지 출력
      router.push(`/main/${token}`); // 게시글 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error("오류 발생:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(true); // 버튼 클릭하면 작은 창 나가지게 상태 유지
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
          <HeaderVD onClick={toggleDropdown}>
            <VericalDot />
            {isOpen && (
              <SearchDropMenu>
                <SeachDropItem onClick={() => handleOptionClick()}>
                  수정
                </SeachDropItem>
                <SeachLine />
                <SeachDropItem onClick={() => handleDelete()}>
                  삭제
                </SeachDropItem>
              </SearchDropMenu>
            )}
          </HeaderVD>
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
