import styled from "styled-components";

const Splash = () => {
  return (
    <Container>
      <AnimatedImageContainer>
        <AnimatedImage src="/assets/images/nav-logo.svg" alt="logo" />
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.85;
`;

const AnimatedImageContainer = styled.div`
  width: 60vw;
  max-width: 250px;
  height: 60vw;
  max-height: 250px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: heartbeat 1s infinite;
  background-color: rgba(255, 255, 255, 0.9);
  opacity: 1;

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
`;

export default Splash;
