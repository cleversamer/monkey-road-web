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
  position: absolute;
  top: 20px;
  right: 60px;
  color: #fff;

  @media screen and (max-width: 960px) {
    right: 30px;
  }

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100vw;
  max-width: 350px;

  @media screen and (max-width: 960px) {
    max-width: 280px;
  }
`;

export default HeaderRight;
