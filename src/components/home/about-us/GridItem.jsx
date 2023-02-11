import styled from "styled-components";
import useLocale from "hooks/useLocale";

const GridItem = ({ Icon, title, paragraph }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
      <TopLine lang={lang}>
        <Icon />
        <Title>{title}</Title>
      </TopLine>

      <Paragraph>{paragraph}</Paragraph>
    </Container>
  );
};

const Container = styled.li`
  background-color: #fafafa;
  box-shadow: 0px 1px 3px 3px rgba(254, 119, 119, 0.35);
  border-radius: 8px;
  width: 100%;
  max-width: 200px;
  height: 150px;
  padding: 10px;
  box-sizing: content-box;
  margin: 0 auto;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const TopLine = styled.span`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: flex-start;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;

  svg {
    fill: #fe7777;
    font-size: 18px;
  }
`;

const Title = styled.h5`
  color: #fe7777;
  font-size: 18px;
  font-weight: 600;
`;

const Paragraph = styled.p`
  line-height: 25px;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;

  @media screen and (max-width: 1080px) {
    font-size: 13px;
  }
`;

export default GridItem;
