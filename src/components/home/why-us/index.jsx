import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const WhyUs = () => {
  return (
    <Container id="why-us">
      <Content>
        <LeftSide />
        <RightSide />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  background-color: rgba(51, 51, 51, 0.8);
  padding: 80px 0;
  max-width: 1366px;
  margin: 0 auto;
`;

const Content = styled(ContentWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  font-size: 26px;
  font-weight: 600;
  padding: 0 40px;
`;

export default WhyUs;
