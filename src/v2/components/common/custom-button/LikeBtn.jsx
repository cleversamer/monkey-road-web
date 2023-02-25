import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";

const LikeBtn = ({ liked, onClick }) => {
  return (
    <Container liked={liked} onClick={onClick}>
      <AiFillHeart />
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 6px;
  transition-duration: 176ms;
  background-color: #fff;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.25);
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
