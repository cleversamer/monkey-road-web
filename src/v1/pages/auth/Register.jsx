import styled from "styled-components";
import RegisterForm from "v1/components/auth/register-form";

const Register = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #f7f7f7;
  max-width: 1366px;
  margin: 0 auto;
`;

export default Register;
