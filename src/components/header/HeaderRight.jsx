import styled from "styled-components";

const HeaderRight = () => {
  return (
    <Container>
      <HeaderImage src="/assets/images/header-car.svg" alt="a car" />
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const HeaderImage = styled.img`
  width: 40vw;
  object-fit: contain;
  position: absolute;
  right: 0;
`;

export default HeaderRight;
