import styled from "styled-components";
import VerificationForm from "v1/components/auth/verification-form";

const Verify = () => {
  return (
    <Container>
      <VerificationForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #f7f7f7;
  max-width: 1366px;
  margin: 0 auto;
`;

export default Verify;
