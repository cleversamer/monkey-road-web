import styled from "styled-components";
import useLocale from "hooks/useLocale";

const HeaderRight = () => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
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
  ${({ lang }) => (lang === "en" ? "right: 60px;" : "left: 60px;")}
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
