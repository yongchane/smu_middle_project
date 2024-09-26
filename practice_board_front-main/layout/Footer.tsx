import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Pencil from "../assets/footer/Pencil.svg";
import Link from "next/link";

interface FooterProps {
  token: string | undefined; // Type for token prop, can be a string or undefined
}

const Footer: React.FC<FooterProps> = ({ token }) => {
  const router = useRouter();

  return (
    <Link href={`/write?token=${token}`} passHref>
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
