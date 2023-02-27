import styled from "styled-components";
import PaymentMethods from "v2/components/common/payment-form/PaymentMethods";
import StripeForm from "v2/components/common/payment-form/StripeForm";
import PaypalForm from "v2/components/common/payment-form/PaypalForm";
import useLocale from "v2/hooks/useLocale";

const Form4 = ({ context, onKeyChange }) => {
  const { i18n } = useLocale();

  const invoiceItems = [{ title: i18n("postCost"), cost: 100 }];

  return (
    <>
      <TitleContainer>
        <Title>{i18n("paymentFormTitle")}</Title>
        <BreakLine />
      </TitleContainer>

      <InputsContainer>
        <PaymentMethods
          paymentMethod={context.paymentMethod}
          onChange={onKeyChange("paymentMethod")}
        />

        {context.paymentMethod === "debit" ? (
          <StripeForm
            items={invoiceItems}
            onKeyChange={onKeyChange}
            context={context}
          />
        ) : (
          <PaypalForm items={invoiceItems} />
        )}
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
  gap: 15px;
`;

export default Form4;
