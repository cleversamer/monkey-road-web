import styled from "styled-components";
import VerificationForm from "v2/components/auth/verification-form";

const Verify = () => {
  return (
    <Container>
      <VerificationForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #fff;
  max-width: 1366px;
  margin: 0 auto;
`;

export default Verify;
