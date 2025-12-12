// src/components/PageHeader.jsx
import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-family: "Montserrat", monospace;
  font-size: 40px; 
  font-weight: 700;
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  font-family: "Montserrat", monospace;
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const PageHeader = () => {
  return (
    <HeaderWrapper>
      <Title>Project Happy Thoughts</Title>
      <Subtitle>Share somthing that makes you happy!</Subtitle>
    </HeaderWrapper>
  );
};
