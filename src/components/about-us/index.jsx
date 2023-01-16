import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const AboutUs = () => {
  return (
    <Container>
      <Title>About Us</Title>

      <Content>
        <LeftSide />
        <RightSide />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 100px;
  padding-bottom: 230px;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

const Content = styled(ContentWrapper)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default AboutUs;
