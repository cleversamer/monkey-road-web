import styled from "styled-components";
import ContentWrapper from "hoc/ContentWrapper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import useLocale from "hooks/useLocale";

const AboutUs = () => {
  const { i18n, lang } = useLocale();

  return (
    <Container id="about-us">
      <Title>{i18n("aboutUs")}</Title>

      <Content lang={lang}>
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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
  }
`;

export default AboutUs;
