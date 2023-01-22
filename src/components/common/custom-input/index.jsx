import styled from "styled-components";
import CheckBox from "./CheckBox";
import EmailOrPhoneInput from "./EmailOrPhoneInput";
import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";
import CodeInput from "./CodeInput";
import RangeInput from "./RangeInput";
import RadioButton from "./RadioButton";

const CustomInput = ({
  value,
  onChange,
  type,
  id,
  title,
  placeholder,
  icc,
  nsn,
  onICCChange,
  onNSNChange,
  min,
  minValue,
  max,
  maxValue,
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
        <NameInput {...props} />
      ) : type === "email" ? (
        <EmailInput {...props} />
      ) : type === "phone" ? (
        <PhoneInput
          icc={icc}
          nsn={nsn}
          onICCChange={onICCChange}
          onNSNChange={onNSNChange}
          {...props}
        />
      ) : type === "code" ? (
        <CodeInput {...props} />
      ) : type === "range" ? (
        <RangeInput
          min={min}
          minValue={minValue}
          max={max}
          maxValue={maxValue}
          onChange={onChange}
        />
      ) : type === "radio" ? (
        <RadioButton title={title} />
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
  margin-bottom: 7px;
`;

export default CustomInput;
