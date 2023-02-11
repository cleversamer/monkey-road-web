import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import useLocale from "hooks/useLocale";

const WhyUs = () => {
  const { lang } = useLocale();

  return (
    <Container id="why-us">
      <Content lang={lang}>
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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: center;
  align-items: center;
  gap: 50px;
  font-size: 26px;
  font-weight: 600;
  padding: 0 40px;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    gap: 30px;
  }
`;

export default WhyUs;
