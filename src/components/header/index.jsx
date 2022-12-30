import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <Container>
      <HeaderLeft />
      <HeaderRight />
    </Container>
  );
};

const Container = styled.header`
  overflow: hidden;
  height: 100vh;
  padding: 70px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
`;

export default Header;
