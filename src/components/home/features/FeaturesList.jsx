import styled from "styled-components";
import FeatureItem from "./FeatureItem";

const FeaturesList = () => {
  return (
    <Container>
      <FeatureItem
        iconPath="/assets/icons/features/car.svg"
        title="Latest models"
        description="Here we provide you with the best and latest car models"
      />

      <FeatureItem
        iconPath="/assets/icons/features/visa.svg"
        title="No bargaining, no pressure"
        description="We publish the best cars at the best prices and the most quality"
      />

      <FeatureItem
        iconPath="/assets/icons/features/post-car.svg"
        title="Post your car"
        description="Hurry up and post your own car in our store"
      />

      <FeatureItem
        iconPath="/assets/icons/features/deals.svg"
        title="Complete deals"
        description="Get the best deal and avoid all scams and scams"
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
