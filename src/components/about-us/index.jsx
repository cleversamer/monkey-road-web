import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const AboutUs = () => {
  return (
    <Container>
      <Title>AboutUs</Title>

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
  align-items: center;
  gap: 40px;
  padding-bottom: 40px;
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
