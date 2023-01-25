import styled from "styled-components";
import CustomInput from "../custom-input";

const CardInfo = ({ context, onKeyChange }) => {
  return (
    <Container>
      <Title>Card information</Title>

      <CustomInput
        type="text"
        title="name on card"
        placeholder="name on card"
        value={context.nameOnCard}
        onChange={onKeyChange("nameOnCard")}
      />

      <CustomInput
        type="text"
        title="card number"
        placeholder="4444 4444 4444 4444"
        value={context.cardNumber}
        onChange={onKeyChange("cardNumber")}
      />

      <CustomInput
        type="text"
        title="CVV/CVC code"
        placeholder="000"
        value={context.cvv}
        onChange={onKeyChange("cvv")}
      />

      <CustomInput
        type="text"
        title="postal code"
        placeholder="12345"
        value={context.postalCode}
        onChange={onKeyChange("postalCode")}
      />

      <CustomInput
        type="expiry"
        onMonthChange={onKeyChange("month")}
        onYearChange={onKeyChange("year")}
        month={context.month}
        year={context.year}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h4`
  text-transform: capitalize;
`;

export default CardInfo;
