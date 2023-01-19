import styled from "styled-components";

const HeaderRight = () => {
  return (
    <Container>
      <Image
        src="/assets/images/header/image-1.svg"
        alt="a man holds a debit card"
      />
    </Container>
  );
};

const Container = styled.div`
  color: #fff;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100vw;
  max-width: 282px;
`;

export default HeaderRight;
