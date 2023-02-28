import styled from "styled-components";
import TextInput from "./TextInput";
import useLocale from "v2/hooks/useLocale";

const CardExpiryYear = ({ year, onYearChange }) => {
  const { i18n } = useLocale();

  return (
    <Container>
      <Title>{i18n("year")}</Title>
      <TextInput value={year} placeholder="26" onChange={onYearChange} />
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

export default CardExpiryYear;
