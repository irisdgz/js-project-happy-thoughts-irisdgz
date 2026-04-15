import React, { useState } from "react";
import styled from "styled-components";
import { Heart, Pencil, Trash2, Check, X } from "lucide-react";

const Card = styled.article`
  background: #ffffff;
  border: 2px solid #000;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 8px 8px 0 #000;
`;

const Message = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  margin: 0 0 16px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EditArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 2px solid #000;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const ErrorText = styled.p`
  color: #9e0b2b;
  font-size: 12px;
  margin: 0 0 8px;
  font-family: "Montserrat", sans-serif;
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
  border: 1px solid #ccc;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LikeCount = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: #464545;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TimeAgo = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: #999;
`;

const getTimeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes === 0) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const ThoughtCard = ({ entry, onLikeMessage, onEditMessage, onDeleteMessage, currentUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.message);
  const [editError, setEditError] = useState("");

  // Only show edit/delete if this thought belongs to the logged in user
  const isOwner = currentUserId && entry.user && entry.user.toString() === currentUserId.toString();

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed.length < 5) { setEditError("Too short (min 5 chars)."); return; }
    if (trimmed.length > 140) { setEditError("Too long (max 140 chars)."); return; }
    onEditMessage(entry._id, trimmed);
    setIsEditing(false);
    setEditError("");
  };

  const handleCancelEdit = () => {
    setEditText(entry.message);
    setIsEditing(false);
    setEditError("");
  };

  return (
    <Card>
      {isEditing ? (
        <>
          <EditArea value={editText} onChange={(e) => setEditText(e.target.value)} />
          {editError && <ErrorText>{editError}</ErrorText>}
        </>
      ) : (
        <Message>{entry.message}</Message>
      )}

      <FooterRow>
        <LikeGroup>
          <LikeButton onClick={() => onLikeMessage(entry._id)}>
            <Heart size={18} color="#c81438" fill="#c81438" />
          </LikeButton>
          <LikeCount>x {entry.hearts}</LikeCount>
        </LikeGroup>

        <RightGroup>
          {isEditing ? (
            <>
              <IconButton onClick={handleSaveEdit} title="Save">
                <Check size={16} color="#2a7a2a" />
              </IconButton>
              <IconButton onClick={handleCancelEdit} title="Cancel">
                <X size={16} color="#999" />
              </IconButton>
            </>
          ) : (
            isOwner && (
              <>
                <IconButton onClick={() => setIsEditing(true)} title="Edit">
                  <Pencil size={16} color="#555" />
                </IconButton>
                <IconButton onClick={() => onDeleteMessage(entry._id)} title="Delete">
                  <Trash2 size={16} color="#c81438" />
                </IconButton>
              </>
            )
          )}
          <TimeAgo>{getTimeAgo(entry.createdAt)}</TimeAgo>
        </RightGroup>
      </FooterRow>
    </Card>
  );
};