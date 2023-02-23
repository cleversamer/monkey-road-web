import styled from "styled-components";
import useLocale from "v1/hooks/useLocale";

const TextInput = ({ placeholder, value, onChange, ...props }) => {
  const { lang } = useLocale();

  return (
    <Container
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      lang={lang}
      {...props}
    />
  );
};

const Container = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 0 15px;
  background-color: transparent;
  border: 1px solid #fe7777;
  border-radius: 8px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};

  ::placeholder {
    text-transform: capitalize;
  }
`;

export default TextInput;
