import styled from "styled-components";
import PaymentMethods from "components/common/payment-form/PaymentMethods";
import StripeForm from "components/common/payment-form/StripeForm";
import PaypalForm from "components/common/payment-form/PaypalForm";

const invoiceItems = [{ title: "Post cost", cost: 100 }];

const Form4 = ({ context, onKeyChange }) => {
  return (
    <>
      <FormTitle>payment method</FormTitle>

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
