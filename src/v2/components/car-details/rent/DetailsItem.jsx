import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const DetailsItem = ({ leftTitle, rightTitle }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
      <DetailsItemLeft>{leftTitle}</DetailsItemLeft>
      <DetailsItemRight>{rightTitle}</DetailsItemRight>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;
`;

const DetailsItemLeft = styled.span`
  font-weight: 500;
  font-size: 15px;
  text-transform: capitalize;
  color: #000000;
`;

const DetailsItemRight = styled.span`
  font-weight: 400;
  font-size: 15px;
  color: #333333;
`;

export default DetailsItem;
