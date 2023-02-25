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
  gap: 12px;
  background-color: #fe7777;
  width: 100%;
  max-width: 100px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 15px;
  text-transform: capitalize;
  color: #fff;
  text-align: center;
`;

const Value = styled.span`
  font-weight: 300;
  font-size: 14px;
  color: #fff;
  text-transform: capitalize;
  text-align: center;
`;

export default DetailsItem;
