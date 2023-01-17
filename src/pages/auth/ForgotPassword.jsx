import styled from "styled-components";
import ForgotPasswordForm from "components/auth/forgot-password-form";

const ForgotPassword = () => {
  return (
    <Container>
      <ForgotPasswordForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #f7f7f7;
  max-width: 1366px;
  margin: 0 auto;
`;

export default ForgotPassword;
