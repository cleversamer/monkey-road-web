import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const AboutUs = () => {
  return (
    <ContentWrapper>
      <Container>
        <Title>AboutUs</Title>
        <Content>
          <LeftSide />
          <RightSide />
        </Content>
      </Container>
    </ContentWrapper>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-bottom: 80px;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AboutUs;
