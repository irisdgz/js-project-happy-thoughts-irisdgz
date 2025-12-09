// src/components/ThoughtCard.jsx
import React from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";

const Card = styled.article`
  background: #ffffff;
  border: 2px solid #000;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 8px 8px 0 #000;
`;

const Message = styled.p`
  font-family: "Montserrat", monospace;
  font-size: 16px;
  margin: 0 0 16px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikeButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.active ? "#ff4b6e" : "#ccc")};
  background-color: ${(props) => (props.active ? "#ffebef" : "#f3f3f3")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LikeCount = styled.span`
  font-family: "Montserrat", monospace;
  font-size: 14px;
  color: #555;
`;

const TimeAgo = styled.span`
  font-family: "Montserrat", monospace;
  font-size: 12px;
  color: #999;
`;

const getTimeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes === 0) return "just now";
  return minutes + " min ago";
};

export const ThoughtCard = ({ entry, onLikeMessage }) => {
  const timeAgo = getTimeAgo(entry.createdAt);
  const active = entry.hearts > 0;

  return (
    <Card>
      <Message>{entry.message}</Message>

      <FooterRow>
        <LikeGroup>
          <LikeButton active={active} onClick={() => onLikeMessage(entry.id)}>
            <Heart
              size={18}
              color={active ? "#ff4b6e" : "#555"}
              fill={active ? "#ff4b6e" : "none"}
            />
          </LikeButton>
          <LikeCount>x {entry.hearts}</LikeCount>
        </LikeGroup>

        <TimeAgo>{timeAgo}</TimeAgo>
      </FooterRow>
    </Card>
  );
};
