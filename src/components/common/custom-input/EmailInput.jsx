import styled from "styled-components";
import { CiMail } from "react-icons/ci";

const EmailInput = ({ value, onChange, ...props }) => {
  return (
    <Container>
      <LeftIcon>
        <CiMail />
      </LeftIcon>

      <Input
        type="email"
        placeholder="example@example.com"
        autoComplete="true"
        value={value}
        onChange={onChange}
        {...props}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding-left: 40px;
  padding-right: 10px;
  background-color: #f4f4f4;
`;

const LeftIcon = styled.span`
  position: absolute;
  margin-top: 5px;
  font-size: 20px;
  padding: 10px;
`;

export default EmailInput;
