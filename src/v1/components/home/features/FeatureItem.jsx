import styled from "styled-components";
import useLocale from "v1/hooks/useLocale";

const FeatureItem = ({ iconPath, title, description }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
      <FeatureIcon src={iconPath} alt={title} />

      <FeatureRight>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureRight>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: flex-start;
  gap: 15px;
  width: 100vw;
  max-width: 400px;

  @media screen and (max-width: 480px) {
    justify-content: center;
  }
`;

const FeatureIcon = styled.img`
  margin-top: 5px;
  width: 40px;
`;

const FeatureRight = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeatureTitle = styled.h4`
  font-size: 22px;
  font-weight: 600;
  color: #fff;

  @media screen and (max-width: 960px) {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  width: 350px;

  @media screen and (max-width: 960px) {
    font-size: 15px;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    max-width: 250px;
  }
`;

export default FeatureItem;
