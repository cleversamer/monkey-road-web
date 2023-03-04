import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const Card = ({ title, value, Icon, onClick }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang} onClick={onClick}>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;
  background-color: #fe7777;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  height: 100px;
  text-transform: capitalize;
  transition-duration: 176ms;
  cursor: pointer;

  svg {
    position: absolute;
    bottom: 13px;
    ${({ lang }) => (lang === "en" ? "right: 13px;" : "left: 13px;")}
    fill: #fff;
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
  color: #fff;
`;

const CardValue = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;

export default Card;
