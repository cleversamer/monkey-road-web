import styled from "styled-components";

const Clips = () => {
  return (
    <>
      <ArrowRight
        src="/assets/icons/features/custom-arrow-right.svg"
        alt="arrow right"
      />

      <ArrowLeft
        src="/assets/icons/features/custom-arrow-left.svg"
        alt="arrow right"
      />

      <Car
        src="/assets/icons/features/open-car.svg"
        alt="a car with open doors"
      />
    </>
  );
};

const ArrowRight = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
`;

const ArrowLeft = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
`;

const Car = styled.img`
  position: absolute;
  top: -200px;
  right: 0;
  width: 40vw;
  max-width: 400px;
`;

export default Clips;
