import styled from "styled-components";
import Invoice from "./Invoice";
import CardInfo from "./CardInfo";

const percentageFee = 0.0229;
const fixedFee = 0.29;

const StripeForm = ({ context, items, onKeyChange }) => {
  return (
    <Container>
      <BreakLine />

      <Invoice
        items={items}
        fixedFee={fixedFee}
        percentageFee={percentageFee}
      />

      <BreakLine />

      <CardInfo context={context} onKeyChange={onKeyChange} />
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

export default StripeForm;
