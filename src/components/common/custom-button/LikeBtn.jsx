import { useState } from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";

const LikeBtn = ({ value = false }) => {
  const [liked, setLiked] = useState(value);

  return (
    <Container liked={liked} onClick={() => setLiked(!liked)}>
      <AiFillHeart />
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 4px;
  transition-duration: 176ms;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;

  svg {
    font-size: 17px;
    transition-duration: 176ms;
    fill: ${({ liked }) => (liked ? "#f00" : "gray")};
  }

  :active {
    transform: scale(0.99);

    svg {
      font-size: 15px;
    }
  }
`;

export default LikeBtn;
