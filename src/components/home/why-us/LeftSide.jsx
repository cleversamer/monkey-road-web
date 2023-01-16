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
`;

const Image = styled.img`
  width: 100%;
`;

export default LeftSide;
