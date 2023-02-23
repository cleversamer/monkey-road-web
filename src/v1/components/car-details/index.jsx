import styled from "styled-components";
import Gallery from "./Gallery";

const CarDetails = ({ children }) => {
  return (
    <Container>
      <Gallery />
      {children}
    </Container>
  );
};

const Container = styled.section``;

export default CarDetails;
