import styled from "styled-components";
import CardInfo from "./CardInfo";

const StripeForm = ({ context, onKeyChange }) => {
  return (
    <Container>
      <CardInfo context={context} onKeyChange={onKeyChange} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 20px;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

export default StripeForm;
