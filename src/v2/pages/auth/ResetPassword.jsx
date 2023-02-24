import styled from "styled-components";
import ResetPasswordForm from "v2/components/auth/reset-password-form";

const ResetLogin = () => {
  return (
    <Container>
      <ResetPasswordForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #fff;
  max-width: 1366px;
  margin: 0 auto;
`;

export default ResetLogin;
