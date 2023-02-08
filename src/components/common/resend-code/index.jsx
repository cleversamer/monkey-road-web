import styled from "styled-components";
import Timer from "./Timer";

const ResendCode = ({ onResend, seconds }) => {
  return (
    <Container>
      <Title>Didn't receive a code?</Title>
      <Timer onClick={onResend} seconds={seconds} />
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
`;

export default ResendCode;
