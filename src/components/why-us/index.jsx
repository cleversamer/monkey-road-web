import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const WhyUs = () => {
  return (
    <Container>
      <Content>
        <LeftSide />
        <RightSide />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  background-color: #333;
  padding: 80px 0;
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
