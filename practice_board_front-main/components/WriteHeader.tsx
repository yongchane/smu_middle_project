// 일단 writeheader /pages/write 로 옮김
// import { useRouter } from "next/router";
// import React from "react";
// import styled from "styled-components";
// import Back from "../assets/header/Back.svg";

// interface WriteHeaderProps {
//   onSubmit?: () => void; // onSubmit 프로퍼티 추가
// }

// const WriteHeader: React.FC<WriteHeaderProps> = ({ onSubmit }) => {
//   const router = useRouter();

//   const handleFinish = () => {
//     if (onSubmit) {
//       onSubmit(); // onSubmit 함수 호출
//     } else {
//       router.push("/write?submit=true"); // 대체 동작
//     }
//   };

//   return (
//     <WriteContainer>
//       <WriteDeleteIcon onClick={() => router.push("/")}>
//         <Back />
//       </WriteDeleteIcon>
//       <WriteTitle>글 쓰기</WriteTitle>
//       <WriteFinishIcon onClick={handleFinish}>완료</WriteFinishIcon>
//     </WriteContainer>
//   );
// };

// export default WriteHeader;

// const WriteContainer = styled.div`
//   display: flex;
//   position: sticky;
//   width: 100%;
//   height: 50px;
//   top: 0;
//   background-color: white;
// `;

// const WriteDeleteIcon = styled.div`
//   margin: 12px 38% 0px 15px;
// `;

// const WriteTitle = styled.div`
//   margin-top: 12px;
//   font-weight: 600;
// `;

// const WriteFinishIcon = styled.div`
//   border: 1px solid red;
//   border-radius: 13px;
//   width: 40px;
//   height: 25px;
//   text-align: center;
//   background-color: red;
//   color: white;
//   font-size: 11px;
//   font-weight: 700;
//   margin-left: 30%;
//   margin-top: 10px;
//   padding-top: 5px;
//   cursor: pointer;
// `;
