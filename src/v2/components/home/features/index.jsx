import styled from "styled-components";
import ContentWrapper from "v2/hoc/ContentWrapper";
import FeaturesList from "./FeaturesList";
import Clips from "./Clips";
import useLocale from "v2/hooks/useLocale";

const Features = () => {
  const { i18n, lang } = useLocale();

  return (
    <Container>
      <Clips />

      <Content lang={lang}>
        <Title>{i18n("featuresSectionTitle")}</Title>
        <FeaturesList />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 60px;
  position: relative;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
`;

const Content = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0;
  z-index: 99999;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const Title = styled.h3`
  color: #fff;
  text-indent: 10px;
  font-size: 32px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 30px;
  }

  @media screen and (max-width: 480px) {
    font-size: 28px;
  }

  @media screen and (max-width: 420px) {
    font-size: 26px;
  }

  @media screen and (max-width: 360px) {
    font-size: 22px;
  }
`;

export default Features;
