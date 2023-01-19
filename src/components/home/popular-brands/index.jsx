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
  padding-bottom: 100px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Content = styled(ContentWrapper)`
  padding-right: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 20px;
`;

export default index;
