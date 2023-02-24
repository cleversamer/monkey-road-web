import styled from "styled-components";
import RegisterForm from "v2/components/auth/register-form";

const Register = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #fff;
  max-width: 1366px;
  margin: 0 auto;
`;

export default Register;
