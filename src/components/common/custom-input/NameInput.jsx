import styled from "styled-components";
import { CiUser } from "react-icons/ci";

const NameInput = ({ value, onChange, ...props }) => {
  return (
    <Container>
      <LeftIcon>
        <CiUser />
      </LeftIcon>

      <Input
        type="text"
        placeholder="Fouad Habboub"
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
  background-color: ${({ disabled }) => (disabled ? "lightgrey" : "#f4f4f4")};
`;

const LeftIcon = styled.span`
  position: absolute;
  margin-top: 5px;
  font-size: 20px;
  padding: 10px;
`;

export default NameInput;
