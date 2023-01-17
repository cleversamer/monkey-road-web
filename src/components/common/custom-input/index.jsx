import styled from "styled-components";
import CheckBox from "./CheckBox";
import EmailOrPhoneInput from "./EmailOrPhoneInput";
import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";

const CustomInput = ({
  value,
  onChange,
  type,
  id,
  title,
  placeholder,
  ...props
}) => {
  type = type.trim();

  return type === "checkbox" ? (
    <CheckBox id={id} title={title} value={value} onChange={onChange} />
  ) : (
    <Container>
      {title && <Title>{title}</Title>}

      {type === "emailorphone" ? (
        <EmailOrPhoneInput value={value} onChange={onChange} {...props} />
      ) : type === "password" ? (
        <PasswordInput value={value} onChange={onChange} {...props} />
      ) : type === "name" ? (
        <NameInput />
      ) : type === "email" ? (
        <EmailInput />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h4`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  color: #333;
  margin-bottom: 4px;
`;

export default CustomInput;
