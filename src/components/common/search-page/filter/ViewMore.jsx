import styled from "styled-components";

const ViewMore = ({ onClick }) => {
  return <Container onClick={onClick}>+ View more</Container>;
};

const Container = styled.div`
  text-transform: capitalize;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  margin-top: 7px;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    color: #fe7777;
  }

  :active {
    transform: scale(0.97);
  }
`;

export default ViewMore;
