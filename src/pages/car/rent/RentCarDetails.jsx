import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Gallery from "components/car-details/Gallery";
import Details from "components/car-details/rent";

const RentCarDetails = () => {
  const { carId } = useParams();

  useEffect(() => {
    // fetch car details
  }, []);

  const handleRentCar = () => {};

  return (
    <Container>
      <Gallery />
      <Details onRent={handleRentCar} />
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  padding: 60px;
  display: flex;
  gap: 40px;
  background: #fafafa;

  @media screen and (max-width: 870px) {
    flex-direction: column;
  }

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

export default RentCarDetails;
