import styled from "styled-components";
import Timer from "./Timer";
import useLocale from "hooks/useLocale";

const ResendCode = ({ onResend, seconds }) => {
  const { i18n } = useLocale();

  return (
    <Container>
      <Title>{i18n("didntReceiveCode")}</Title>
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
