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
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";
import CardExpiryInput from "./CardExpiryInput";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";

const CustomInput = ({
  value,
  onChange,
  type,
  id,
  primary,
  title,
  subtitle,
  placeholder,
  icc,
  nsn,
  onICCChange,
  onNSNChange,
  min,
  minValue,
  max,
  maxValue,
  values,
  selectedIndex,
  valueParser,
  month,
  year,
  onMonthChange,
  onYearChage,
  verified,
  onVerify,
  profile,
  ...props
}) => {
  type = type.trim();

  return type === "checkbox" ? (
    <CheckBox id={id} title={title} value={value} onChange={onChange} />
  ) : (
    <Container>
      {title && (
        <TitleContainer>
          <Title>{title}</Title>

          {subtitle && <Subtitle>({subtitle})</Subtitle>}

          {!!["email", "phone"].includes(type) && profile && (
            <>
              <VerificationStatus verified={verified}>
                {verified ? "verified" : "not verified"}
              </VerificationStatus>

              {!verified && (
                <VerifyButton onClick={onVerify}>verify</VerifyButton>
              )}
            </>
          )}
        </TitleContainer>
      )}

      {type === "emailorphone" ? (
        <EmailOrPhoneInput value={value} onChange={onChange} {...props} />
      ) : type === "password" ? (
        <PasswordInput value={value} onChange={onChange} {...props} />
      ) : type === "name" ? (
        <NameInput value={value} onChange={onChange} {...props} />
      ) : type === "email" ? (
        <EmailInput value={value} onChange={onChange} {...props} />
      ) : type === "phone" ? (
        <PhoneInput
          icc={icc}
          nsn={nsn}
          onICCChange={onICCChange}
          onNSNChange={onNSNChange}
          primary={primary}
          {...props}
        />
      ) : type === "code" ? (
        <CodeInput value={value} onChange={onChange} {...props} />
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
      ) : type === "text" ? (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : type === "select" ? (
        <SelectInput
          onChange={onChange}
          placeholder={placeholder}
          values={values}
          selectedIndex={selectedIndex}
          valueParser={valueParser}
          {...props}
        />
      ) : type === "description" ? (
        <DescriptionInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      ) : type === "image" ? (
        <ImageInput onChange={onChange} {...props} />
      ) : type === "expiry" ? (
        <CardExpiryInput
          month={month}
          year={year}
          onMonthChange={onMonthChange}
          onYearChange={onYearChage}
          {...props}
        />
      ) : type === "date" ? (
        <DateInput onChange={onChange} />
      ) : type === "time" ? (
        <TimeInput />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const TitleContainer = styled.h4`
  margin-bottom: 7px;
  text-transform: capitalize;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Subtitle = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: gray;
`;

const VerificationStatus = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ verified }) => (verified ? "#0DD215" : "#f00")};
  text-transform: capitalize;
`;

const VerifyButton = styled.span`
  margin-left: auto;
  margin-right: 10px;
  font-size: 10px;
  font-weight: 600;
  color: #00f;
  text-decoration: underline;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    color: #fe7777;
  }
`;

export default CustomInput;
