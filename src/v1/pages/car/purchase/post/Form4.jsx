import styled from "styled-components";
import PaymentMethods from "v1/components/common/payment-form/PaymentMethods";
import StripeForm from "v1/components/common/payment-form/StripeForm";
import PaypalForm from "v1/components/common/payment-form/PaypalForm";
import useLocale from "v1/hooks/useLocale";

const Form4 = ({ context, onKeyChange }) => {
  const { i18n } = useLocale();

  const invoiceItems = [{ title: i18n("postCost"), cost: 100 }];

  return (
    <>
      <FormTitle>{i18n("paymentFormTitle")}</FormTitle>

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
    </>
  );
};

const FormTitle = styled.h3`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 24px;
    text-align: center;
  }
`;

export default Form4;
