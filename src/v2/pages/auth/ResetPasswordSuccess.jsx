import styled from "styled-components";
import ResetPasswordSuccess from "v2/components/auth/reset-password-success";

const ResetLogin = () => {
  return (
    <Container>
      <ResetPasswordSuccess />
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
