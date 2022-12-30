import styled from "styled-components";
import Header from "components/header";

const Home = () => {
  return (
    <Container>
      <Content>
        <Header />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: #fafafa;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default Home;
