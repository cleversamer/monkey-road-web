import styled from "styled-components";

const CheckBox = ({ id, title, value, onChange, ...props }) => {
  return (
    <Container>
      <Input
        id={id}
        type="checkbox"
        checked={value}
        onChange={onChange}
        {...props}
      />

      {title && <Label htmlFor={id}>{title}</Label>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
  background-color: red;
`;

const Label = styled.label`
  color: #333;
  font-size: 13px;
  font-weight: 400;
  text-transform: capitalize;
  cursor: pointer;
`;

export default CheckBox;
