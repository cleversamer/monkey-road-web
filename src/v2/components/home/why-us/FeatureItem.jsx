import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

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
`;

const FeatureIcon = styled.img`
  margin-top: -5px;
`;

const FeatureRight = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeatureTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
`;

const FeatureDescription = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;

  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`;

export default FeatureItem;
