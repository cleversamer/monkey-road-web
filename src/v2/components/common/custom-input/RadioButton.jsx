import styled from "styled-components";

const RadioButton = ({ id, title, ...props }) => {
  return <Container id={id} type="radio" {...props} />;
};

const Container = styled.input``;

export default RadioButton;
