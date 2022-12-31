import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const ContactUs = () => {
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
  padding: 100px 40px;
  padding-bottom: 250px;
`;

const Content = styled(ContentWrapper)`
  display: flex;
  justify-content: space-between;
`;

export default ContactUs;
