import React from "react";
import styled from "styled-components";

import ReadingGlasses from "../assets/header/ReadingGlasses.svg";
import { useRouter } from "next/router";

const SearchHeader = () => {
  const router = useRouter();
  return (
    <SearchContainer>
      <SearchBox>
        <IconContainer>
          <ReadingGlasses />
        </IconContainer>
        <SearchInput placeholder="글 제목,내용,해시태그" />
      </SearchBox>

      <SearchCancel onClick={() => router.push("/")}>취소</SearchCancel>
    </SearchContainer>
  );
};

export default SearchHeader;

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
