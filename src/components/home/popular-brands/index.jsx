import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import Brand from "./Brand";

const index = () => {
  return (
    <Container>
      <Title>Popular brands</Title>
      <Content>
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
        <Brand title="Mazda" imageURL="/assets/images/brands/mazda.svg" />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  padding-bottom: 130px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 60px;
  font-size: 32px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Content = styled(ContentWrapper)`
  display: flex;
  justify-content: space-between;
`;

export default index;
