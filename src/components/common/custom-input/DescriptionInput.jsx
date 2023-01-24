import styled from "styled-components";

const DescriptionInput = ({ placeholder, value, onChange, ...props }) => {
  return (
    <Container
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const Container = styled.textarea`
  width: 100%;
  height: 150px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 12px;
  background-color: transparent;
  border: 1px solid #fe7777;
  border-radius: 8px;
  resize: none;

  ::placeholder {
    text-transform: capitalize;
  }
`;

export default DescriptionInput;
