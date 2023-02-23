import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const FilterItem = ({ title, count, active, onClick }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang} active={active} onClick={onClick}>
      <Item>{title}</Item>
      <Item>({count})</Item>
    </Container>
  );
};

const Container = styled.li`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  transition-duration: 176ms;
  cursor: pointer;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 6px;

  :hover {
    color: #fe7777;
  }

  :active {
    transform: scale(0.97);
  }

  * {
    color: ${({ active }) => (active ? "#fe7777" : "#000")};
  }
`;

const Item = styled.span``;

export default FilterItem;
