import styled from "styled-components";
import FeaturesList from "./FeaturesList";
import useLocale from "v1/hooks/useLocale";

const RightSide = () => {
  const { i18n, lang } = useLocale();

  return (
    <Container lang={lang}>
      <Title>{i18n("whyUs")}</Title>

      <Description>{i18n("whyUsDescription")}</Description>

      <FeaturesList />
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  display: flex;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  flex-direction: column;
  gap: 15px;

  @media screen and (max-width: 1080px) {
    width: 100%;
    max-width: 800px;
    padding: 0 30px;
  }
`;

const Title = styled.h3`
  text-transform: capitalize;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
  color: #fff;
  max-width: 500px;

  @media screen and (max-width: 1080px) {
    font-size: 14px;
  }
`;

export default RightSide;
