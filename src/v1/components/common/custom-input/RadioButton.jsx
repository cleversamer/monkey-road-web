import styled from "styled-components";

const RadioButton = ({ id, title, ...props }) => {
  return <Input id={id} type="radio" {...props} />;
};

const Container = styled.div``;

const Input = styled.input``;

const Label = styled.label``;

export default RadioButton;
