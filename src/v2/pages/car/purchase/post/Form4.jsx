import styled from "styled-components";
import PaymentMethods from "v2/components/common/payment-form/PaymentMethods";
import useLocale from "v2/hooks/useLocale";
import Invoice from "v2/components/common/payment-form/Invoice";

const paypal = { fixedFee: 0.0, percentageFee: 0.025 };
const visa = { fixedFee: 0.0, percentageFee: 0.025 };

const Form4 = ({ context, onKeyChange }) => {
  const { i18n } = useLocale();

  const invoiceItems = [{ title: i18n("postCost"), cost: 100 }];
  const paymentData = context.paymentMethod === "debit" ? visa : paypal;

  return (
    <>
      <TitleContainer>
        <Title>{i18n("paymentFormTitle")}</Title>
        <BreakLine />
      </TitleContainer>

      <InputsContainer>
        <InputsRow>
          <PaymentMethods
            paymentMethod={context.paymentMethod}
            onChange={onKeyChange("paymentMethod")}
          />

          <Invoice items={invoiceItems} {...paymentData} />
        </InputsRow>
      </InputsContainer>
    </>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 24px;
    text-align: center;
  }
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media screen and (max-width: 680px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export default Form4;
