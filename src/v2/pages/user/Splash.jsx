import styled from "styled-components";

const Splash = () => {
  return (
    <Container>
      <AnimatedImage src="/assets/images/nav-logo.svg" alt="logo" />
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

export default Splash;
