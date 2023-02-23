import styled from "styled-components";
import FeatureItem from "./FeatureItem";
import useLocale from "v2/hooks/useLocale";

const FeaturesList = () => {
  const { i18n } = useLocale();

  return (
    <Container>
      <FeatureItem
        iconPath="/assets/icons/better-exp.svg"
        title={i18n("whyUs1Title")}
        description={i18n("whyUs1Description")}
      />

      <FeatureItem
        iconPath="/assets/icons/better-cars.svg"
        title={i18n("whyUs2Title")}
        description={i18n("whyUs2Description")}
      />

      <FeatureItem
        iconPath="/assets/icons/guarantee.svg"
        title={i18n("whyUs3Title")}
        description={i18n("whyUs3Description")}
      />

      <FeatureItem
        iconPath="/assets/icons/better-anywhere.svg"
        title={i18n("whyUs4Title")}
        description={i18n("whyUs4Description")}
      />
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 150px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-row-gap: 30px;
  }
`;

export default FeaturesList;
