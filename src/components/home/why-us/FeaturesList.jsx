import styled from "styled-components";
import FeatureItem from "./FeatureItem";

const FeaturesList = () => {
  return (
    <Container>
      <FeatureItem
        iconPath="/assets/icons/better-exp.svg"
        title="Better experience"
        description="We believe in fairness and transparency"
      />

      <FeatureItem
        iconPath="/assets/icons/better-cars.svg"
        title="Better cars"
        description="Like-new cars at like-wow prices"
      />

      <FeatureItem
        iconPath="/assets/icons/guarantee.svg"
        title="Better guarantees"
        description="our vehicles are guaranteed like no place else"
      />

      <FeatureItem
        iconPath="/assets/icons/better-anywhere.svg"
        title="Better than anywhere"
        description="Compare and you will find no other choice makes sense"
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
