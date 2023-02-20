import styled from "styled-components";
import useLocale from "hooks/useLocale";

const Card = ({ title, value, Icon }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  /* width: 90vw;
  max-width: 270px; */
  height: 100px;
  text-transform: capitalize;
  transition-duration: 176ms;
  cursor: pointer;

  svg {
    position: absolute;
    bottom: 13px;
    ${({ lang }) => (lang === "en" ? "right: 13px;" : "left: 13px;")}
    fill: #fe7777;
  }

  :hover {
    transform: scale(0.98);
  }

  :active {
    transform: scale(0.96);
  }
`;

const CardTitle = styled.h6`
  font-size: 16px;
  color: #fe7777;
`;

const CardValue = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

export default Card;
