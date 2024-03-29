import styled from "styled-components";
import ResetPasswordForm from "v1/components/auth/reset-password-form";

const ResetLogin = () => {
  return (
    <Container>
      <ResetPasswordForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #f7f7f7;
  max-width: 1366px;
  margin: 0 auto;
`;

export default ResetLogin;
