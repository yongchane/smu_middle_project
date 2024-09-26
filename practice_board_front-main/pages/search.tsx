import React from "react";
import styled from "styled-components";

import ReadingGlasses from "../assets/header/ReadingGlasses.svg";
import { useRouter } from "next/router";
export default function Search() {
  const router = useRouter();
  const { token } = router.query;
  // if (!token) {
  //   alert("토큰이 유효하지 않습니다. 로그인 페이지로 이동합니다.");
  //   router.push("/login"); // 토큰이 없을 경우 로그인 페이지로 리다이렉트
  //   return;
  // }
  // try {
  //   const response = await fetch("https://kscold.store/api/boards", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`, // Bearer 토큰을 사용하여 인증
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: title, // 제목 데이터
  //       content: content, // 내용 데이터
  //     }),
  //   });
  return (
    <div>
      <SearchContainer>
        <SearchBox>
          <IconContainer>
            <ReadingGlasses />
          </IconContainer>
          <SearchInput placeholder="글 제목,내용,해시태그" />
        </SearchBox>

        <SearchCancel onClick={() => router.push("/")}>취소</SearchCancel>
      </SearchContainer>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100px",
        }}
      ></div>
    </div>
  );
}

const SearchContainer = styled.div`
  display: flex;
  position: sticky;
  text-align: center;
  width: 100%;
  height: 50px;
  top: 0;
  background-color: white;
  padding-top: 7px;
  padding-left: 10px;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  padding: 0.625rem 0.9375rem;
  align-items: center;
  background-color: #ebedf0;
  border-radius: 12px;
  border: 0.0625rem solid #ebedf0;
  margin: 2px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: none;
  outline: none;
`;

const SearchCancel = styled.div`
  margin-left: 6%;
  margin-top: 3%;
`;
