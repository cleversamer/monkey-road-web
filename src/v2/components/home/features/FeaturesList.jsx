import styled from "styled-components";
import FeatureItem from "./FeatureItem";
import useLocale from "v2/hooks/useLocale";

const FeaturesList = () => {
  const { i18n } = useLocale();

  return (
    <Container>
      <FeatureItem
        iconPath="/assets/icons/features/car.svg"
        title={i18n("feature1Title")}
        description={i18n("feature1Description")}
      />

      <FeatureItem
        iconPath="/assets/icons/features/visa.svg"
        title={i18n("feature2Title")}
        description={i18n("feature2Description")}
      />

      <FeatureItem
        iconPath="/assets/icons/features/post-car.svg"
        title={i18n("feature3Title")}
        description={i18n("feature3Description")}
      />

      <FeatureItem
        iconPath="/assets/icons/features/deals.svg"
        title={i18n("feature4Title")}
        description={i18n("feature4Description")}
      />
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 60px;
  grid-column-gap: 10vw;
  margin-top: 20px;

  @media screen and (max-width: 920px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 40px;
  }
`;

export default FeaturesList;
