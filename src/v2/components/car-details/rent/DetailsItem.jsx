import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const DetailsItem = ({ title, value }) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  background-color: #fe7777;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 15px;
  text-transform: capitalize;
  color: #fff;
`;

const Value = styled.span`
  font-weight: 300;
  font-size: 14px;
  color: #fff;
`;

export default DetailsItem;
