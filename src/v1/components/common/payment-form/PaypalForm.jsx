import styled from "styled-components";
import Invoice from "./Invoice";

const percentageFee = 0.0349;
const fixedFee = 0.49;

const PaypalForm = ({ items }) => {
  return (
    <Container>
      <BreakLine />

      <Invoice
        percentageFee={percentageFee}
        fixedFee={fixedFee}
        items={items}
      />

      <BreakLine />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

export default PaypalForm;
