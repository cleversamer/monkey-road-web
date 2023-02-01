import styled from "styled-components";
import GoogleMap from "components/google-map";

const Details3 = ({ order, onPrev }) => {
  return (
    <Container>
      <TitleContainer>
        <CarTitle>Car name</CarTitle>
        <CarPricePerDay>1000 AED / day</CarPricePerDay>
      </TitleContainer>

      <BreakLine />

      <GoogleMap />
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 870px) {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CarTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  text-transform: capitalize;
`;

const CarPricePerDay = styled.h3`
  font-weight: 600;
  font-size: 20px;
  text-transform: capitalize;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

export default Details3;
