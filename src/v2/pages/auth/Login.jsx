import styled from "styled-components";
import LoginForm from "v2/components/auth/login-form";

const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #f7f7f7;
  max-width: 1366px;
  margin: 0 auto;
`;

export default Login;
