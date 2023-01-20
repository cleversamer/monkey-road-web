import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const AboutUs = () => {
  return (
    <Container id="about-us">
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
  gap: 40px;
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

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
  }
`;

export default AboutUs;
