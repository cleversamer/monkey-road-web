import styled from "styled-components";
import { CiMail } from "react-icons/ci";
import useLocale from "v1/hooks/useLocale";

const EmailOrPhoneInput = (props) => {
  const { lang } = useLocale();

  return (
    <Container lang={lang}>
      <LeftIcon>
        <CiMail />
      </LeftIcon>

      <Input
        type="text"
        placeholder="example@example.com"
        autoComplete="true"
        lang={lang}
        {...props}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding-left: ${({ lang }) => (lang === "en" ? "40px" : "10px")};
  padding-right: ${({ lang }) => (lang === "en" ? "10px" : "40px")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  background-color: #f4f4f4;
`;

const LeftIcon = styled.span`
  position: absolute;
  margin-top: 5px;
  font-size: 20px;
  padding: 10px;
`;

export default EmailOrPhoneInput;
