import styled from "styled-components";

const LeftSide = () => {
  return (
    <Container>
      <Image src="/assets/images/why-us.svg" />
    </Container>
  );
};

const Container = styled.div`
  width: 25%;

  @media screen and (max-width: 1080px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 100vw;
  max-width: 270px;
`;

export default LeftSide;
