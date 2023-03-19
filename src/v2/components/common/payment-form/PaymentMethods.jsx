import { useRef } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const PaymentMethods = ({ onChange, paymentMethod }) => {
  const { i18n, lang } = useLocale();
  const debitRef = useRef(null);
  const paypalRef = useRef(null);

  return (
    <Container>
      <Title>{i18n("paymentMethods")}</Title>

      <MethodsList>
        <MethodItem lang={lang} onClick={() => debitRef.current.click()}>
          <ImageContainer lang={lang}>
            <MethodImage
              src="/assets/icons/payment/fatora.svg"
              alt="fatora payment gateway"
            />
            <MethodTitle>{i18n("fatora")}</MethodTitle>
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

        <MethodItem lang={lang} onClick={() => paypalRef.current.click()}>
          <ImageContainer lang={lang}>
            <MethodImage src="/assets/icons/payment/paypal.svg" alt="paypal" />
            <MethodTitle>{i18n("paypal")}</MethodTitle>
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
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 10px;
`;

const MethodInput = styled.input``;

const MethodImage = styled.img``;

const MethodTitle = styled.h5`
  text-transform: capitalize;
`;

export default PaymentMethods;
