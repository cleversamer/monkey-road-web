import { useRef } from "react";
import styled from "styled-components";

const PaymentMethods = ({ onChange, paymentMethod }) => {
  const debitRef = useRef(null);
  const paypalRef = useRef(null);

  return (
    <Container>
      <Title>Payment methods</Title>

      <MethodsList>
        <MethodItem onClick={() => debitRef.current.click()}>
          <ImageContainer>
            <MethodImage src="/assets/icons/payment/visa.svg" alt="visa card" />
            <MethodTitle>Debit/credit card</MethodTitle>
          </ImageContainer>

          <MethodInput
            type="radio"
            ref={debitRef}
            name="payment-method"
            checked={paymentMethod === "debit"}
            value="debit"
            onChange={onChange}
          />
        </MethodItem>

        <MethodItem onClick={() => paypalRef.current.click()}>
          <ImageContainer>
            <MethodImage
              src="/assets/icons/payment/paypal.svg"
              alt="paypal logo"
            />
            <MethodTitle>Paypal</MethodTitle>
          </ImageContainer>

          <MethodInput
            type="radio"
            ref={paypalRef}
            name="payment-method"
            checked={paymentMethod === "paypal"}
            value="paypal"
            onChange={onChange}
          />
        </MethodItem>
      </MethodsList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Title = styled.h4`
  text-transform: capitalize;
`;

const MethodsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MethodItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MethodInput = styled.input``;

const MethodImage = styled.img``;

const MethodTitle = styled.h5`
  text-transform: capitalize;
`;

export default PaymentMethods;
