import styled from "styled-components";

const LeftSide = () => {
  return (
    <Container>
      <Image
        src="/assets/images/about-us.svg"
        alt="some people talking with each others"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 550px;
`;

export default LeftSide;
