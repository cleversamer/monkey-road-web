import styled from "styled-components";
import CustomInput from "../custom-input";
import useLocale from "v2/hooks/useLocale";

const CardInfo = ({ context, onKeyChange }) => {
  const { i18n } = useLocale();

  return (
    <Container>
      <Title>{i18n("cardInfo")}</Title>

      <InputsRow>
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
      </InputsRow>

      <InputsRow>
        <CustomInput
          type="text"
          title={i18n("postalCode")}
          placeholder="12345"
          value={context.postalCode}
          onChange={onKeyChange("postalCode")}
        />

        <CustomInput
          type="expiryYear"
          onYearChange={onKeyChange("year")}
          year={context.year}
        />

        <CustomInput
          type="expiryMonth"
          onMonthChange={onKeyChange("month")}
          month={context.month}
        />
      </InputsRow>
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

const InputsRow = styled.div`
  display: flex;
  gap: 15px;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

export default CardInfo;
