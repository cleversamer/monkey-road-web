import styled from "styled-components";
import CustomInput from "../custom-input";
import useLocale from "v2/hooks/useLocale";

const CardInfo = ({ context, onKeyChange }) => {
  const { i18n } = useLocale();

  return (
    <Container>
      <Title>{i18n("cardInfo")}</Title>

      <CustomInput
        type="text"
        title={i18n("nameOnCard")}
        placeholder={i18n("nameOnCard")}
        value={context.nameOnCard}
        onChange={onKeyChange("nameOnCard")}
      />

      <CustomInput
        type="text"
        title={i18n("cardNumber")}
        subtitle={`16 ${i18n("digit")}`}
        placeholder="4444 4444 4444 4444"
        value={context.cardNumber}
        onChange={onKeyChange("cardNumber")}
      />

      <CustomInput
        type="text"
        title={i18n("cvv")}
        subtitle={`3 ${i18n("digits")}`}
        placeholder="000"
        value={context.cvv}
        onChange={onKeyChange("cvv")}
      />

      <CustomInput
        type="text"
        title={i18n("postalCode")}
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
