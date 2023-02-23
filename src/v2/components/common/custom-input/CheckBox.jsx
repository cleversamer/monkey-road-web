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
  line-height: 2.1ex;
  position: absolute;
  left: -999em;

  :checked + label::after {
    content: "";
    position: absolute;
    width: 9px;
    height: 3px;
    background: rgba(0, 0, 0, 0);
    top: 6px;
    left: 4px;
    border: 3px solid #fe7777;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  + label {
    position: relative;
    overflow: hidden;
    cursor: pointer;

    ::before {
      content: "";
      display: inline-block;
      vertical-align: -25%;
      height: 17px;
      width: 17px;
      background-color: #fff;
      border: 1px solid rgb(166, 166, 166);
      border-radius: 4px;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.15);
      margin-right: 0.5em;
    }
  }
`;

const Label = styled.label`
  color: #333;
  font-size: 13px;
  font-weight: 400;
  text-transform: capitalize;
  cursor: pointer;
`;

export default CheckBox;
