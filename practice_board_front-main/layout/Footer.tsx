import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Pencil from "../assets/footer/Pencil.svg";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname.startsWith(path);

  return (
    <Link href="/write">
      <FooterContainer>
        <FooterItem>
          <FooterItemContent>
            <FooterIcon>
              <Pencil />
            </FooterIcon>
            글 쓰기
          </FooterItemContent>
        </FooterItem>
      </FooterContainer>
    </Link>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: sticky;
  bottom: 30px;

  width: 100%;
  height: 40%;
  background: rgba(128, 128, 128, 0); /* 배경 투명도 조절 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const FooterItem = styled.div`
  border: 1px solid #c8cdcf;
  border-radius: 19px;
  background-color: #f5f9fa;
  width: 120px;
  height: 40px;

  /* padding-top: 9px; */
`;
const FooterIcon = styled.div``;
const FooterItemContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 7px;
  font-weight: 700;
  color: #484d4f;
`;
// const FooterItemTitle = styled.div<{ active: boolean }>`
//   font-size: 12px;
//   color: ${({ active }) => (active ? "#000" : "#888")};
//   margin-top: 5px;
// `;
