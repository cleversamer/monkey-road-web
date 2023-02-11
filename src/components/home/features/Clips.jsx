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

      <Car src="/assets/images/open-car.png" alt="a car with open doors" />
    </>
  );
};

const Arrow = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;

  @media screen and (max-width: 480px) {
    object-fit: cover;
    width: 50%;
  }
`;

const ArrowRight = styled(Arrow)`
  left: 0;
`;

const ArrowLeft = styled(Arrow)`
  right: 0;
`;

const Car = styled.img`
  position: absolute;
  top: -136px;
  right: 20px;
  width: 100vw;
  max-width: 400px;

  @media screen and (max-width: 1000px) {
    max-width: 300px;
  }

  @media screen and (max-width: 768px) {
    max-width: 350px;
    top: -18vw;
  }

  @media screen and (max-width: 640px) {
    max-width: 280px;
    top: -22vw;
  }

  @media screen and (max-width: 420px) {
    max-width: 230px;
    top: -22vw;
  }

  @media screen and (max-width: 360px) {
    max-width: 200px;
    top: -24vw;
  }
`;

export default Clips;
