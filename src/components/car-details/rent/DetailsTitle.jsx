import styled from "styled-components";
import useLocale from "hooks/useLocale";

const DetailsTitle = ({ title }) => {
  const { lang } = useLocale();

  return <Container lang={lang}>{title}</Container>;
};

const Container = styled.h4`
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

export default DetailsTitle;
