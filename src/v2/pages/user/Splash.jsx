import styled from "styled-components";

const Splash = () => {
  return (
    <Container>
      <AnimatedImageContainer>
        <AnimatedImage src="/assets/images/splash-car.png" alt="logo" />
      </AnimatedImageContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  background-image: url("/assets/images/dubai-2.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const AnimatedImageContainer = styled.div`
  width: 70vw;
  max-width: 300px;
  height: 70vw;
  max-height: 300px;
  border-radius: 50%;
  background-color: #ffffff80;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: heartbeat 1s infinite;

  @keyframes heartbeat {
    0% {
      transform: scale(0.75);
    }
    20% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.75);
    }
    60% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.75);
    }
    100% {
      transform: scale(0.75);
    }
  }
`;

const AnimatedImage = styled.img`
  width: 70vw;
  max-width: 300px;
  animation: heartbeat 1s infinite;

  @keyframes heartbeat {
    0% {
      transform: scale(0.75);
    }
    20% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.75);
    }
    60% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.75);
    }
    100% {
      transform: scale(0.75);
    }
  }
`;

const Logo = styled.img``;

export default Splash;
