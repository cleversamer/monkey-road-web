import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <Container>
      <Content>
        <HeaderLeft />
        <HeaderRight />
      </Content>
    </Container>
  );
};

const Container = styled.header`
  overflow: hidden;
`;

const Content = styled(ContentWrapper)`
  height: 100vh;
  padding: 70px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
`;

export default Header;
