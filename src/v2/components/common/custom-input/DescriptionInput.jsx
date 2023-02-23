import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const DescriptionInput = ({ placeholder, value, onChange, ...props }) => {
  const { lang } = useLocale();

  return (
    <Container
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      lang={lang}
      {...props}
    />
  );
};

const Container = styled.textarea`
  width: 100%;
  height: 150px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 12px;
  background-color: transparent;
  border: 1px solid #fe7777;
  border-radius: 8px;
  resize: none;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};

  ::placeholder {
    text-transform: capitalize;
  }
`;

export default DescriptionInput;
