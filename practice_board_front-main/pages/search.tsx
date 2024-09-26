import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReadingGlasses from "../assets/header/ReadingGlasses.svg";
import { useRouter } from "next/router";

// Board 데이터 타입 정의
interface Board {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    nickname: string;
    email: string;
  };
}

export default function Search() {
  const router = useRouter();
  const { token } = router.query;

  const [query, setQuery] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState<Board[]>([]); // 검색 결과 상태

  // API 호출 함수
  const fetchSearchResults = async (searchQuery: string) => {
    try {
      const response = await fetch("https://kscold.store/api/boards", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 사용하여 인증
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: Board[] = await response.json(); // 응답 데이터를 Board[] 타입으로 변환
        const filteredData = data.filter(
          (item) =>
            item.title.includes(searchQuery) ||
            item.content.includes(searchQuery)
        );
        setSearchResults(filteredData); // 필터링된 데이터 설정
      } else {
        throw new Error("검색 실패");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 검색어가 변경될 때마다 API 호출
  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]); // 검색어가 없으면 결과 초기화
    }
  }, [query]);

  return (
    <div>
      <SearchContainer>
        <SearchBox>
          <IconContainer>
            <ReadingGlasses />
          </IconContainer>
          <SearchInput
            placeholder="글 제목, 내용, 해시태그"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // 검색어 업데이트
          />
        </SearchBox>

        <SearchCancel onClick={() => router.back()}>취소</SearchCancel>
      </SearchContainer>

      {/* 검색 결과 렌더링 */}
      <ResultsContainer>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <ResultItem
              key={result.id}
              onClick={() =>
                router.push(`/main/contents/${result.id}?token=${token}`)
              }
            >
              <h3>{result.title}</h3>
              <p>{result.content}</p>
              <p>작성자: {result.user.nickname}</p>
            </ResultItem>
          ))
        ) : (
          <NoResults>검색 결과가 없습니다.</NoResults>
        )}
      </ResultsContainer>
    </div>
  );
}

// 스타일 정의
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
  cursor: pointer;
`;

const ResultsContainer = styled.div`
  padding: 20px;
`;

const ResultItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const NoResults = styled.p`
  text-align: center;
  color: gray;
`;
