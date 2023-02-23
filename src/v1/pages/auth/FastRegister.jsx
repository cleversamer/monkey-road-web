import styled from "styled-components";
import PhoneForm from "v1/components/auth/phone-form";

const FastRegister = () => {
  return (
    <Container>
      <PhoneForm />
    </Container>
  );
};

const Container = styled.main`
  padding: 80px 0;
  background: #f7f7f7;
  max-width: 1366px;
  margin: 0 auto;
`;

export default FastRegister;
