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
  width: 40%;
`;

const Image = styled.img`
  width: 100%;
  margin-top: -25px;
`;

export default LeftSide;
