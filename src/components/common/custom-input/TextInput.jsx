import styled from "styled-components";

const TextInput = ({ placeholder, value, onChange, ...props }) => {
  return (
    <Container
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const Container = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 0 15px;
  background-color: transparent;
  border: 1px solid #fe7777;
  border-radius: 8px;

  ::placeholder {
    text-transform: capitalize;
  }
`;

export default TextInput;
