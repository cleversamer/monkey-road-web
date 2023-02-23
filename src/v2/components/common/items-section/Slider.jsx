import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1080, itemsToShow: 4 },
  { width: 1280, itemsToShow: 5 },
  { width: 1366, itemsToShow: 6 },
];

const Slider = ({ children }) => {
  return (
    <Container>
      <Carousel
        breakPoints={breakPoints}
        enableSwipe
        enableTilt
        enableAutoPlay
        pagination={false}
        autoPlaySpeed={5000}
      >
        {children}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1366x;
  overflow-x: auto;
`;

export default Slider;
