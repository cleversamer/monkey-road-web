import styled from "styled-components";
import TextInput from "./TextInput";
import useLocale from "v2/hooks/useLocale";

const CardExpiryMonth = ({ month, onMonthChange }) => {
  const { i18n } = useLocale();

  return (
    <Container>
      <Title>{i18n("month")}</Title>
      <TextInput value={month} placeholder="06" onChange={onMonthChange} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.h5`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export default CardExpiryMonth;
