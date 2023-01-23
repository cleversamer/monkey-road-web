import styled from "styled-components";

const CodeInput = (props) => {
  return (
    <Container>
      <Input type="text" placeholder="0000" autoComplete="true" {...props} />
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
  padding: 0 10px;
  background-color: #f4f4f4;
  text-align: center;

  &,
  ::placeholder {
    font-size: 15px;
    font-weight: 600;
  }
`;

export default CodeInput;
