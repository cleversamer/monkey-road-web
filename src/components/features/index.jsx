import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import FeaturesList from "./FeaturesList";
import Clips from "./Clips";

const Features = () => {
  return (
    <Container>
      <Clips />

      <Content>
        <Title>Here comfort and safety</Title>
        <FeaturesList />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  background-color: #333;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  position: relative;
`;

const Content = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0;
`;

const Title = styled.h3`
  color: #fff;
  text-indent: 10px;
  font-size: 32px;
  font-weight: 700;
`;

export default Features;
