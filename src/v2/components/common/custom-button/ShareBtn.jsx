import styled from "styled-components";
import { AiOutlineShareAlt } from "react-icons/ai";

const LikeBtn = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <AiOutlineShareAlt />
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
  }

  :active {
    transform: scale(0.99);

    svg {
      font-size: 15px;
    }
  }
`;

export default LikeBtn;
