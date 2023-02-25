import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const SelectInput = ({
  values,
  selectedIndex,
  placeholder,
  onChange,
  valueParser,
}) => {
  const { lang } = useLocale();

  return (
    <Container
      placeholder={placeholder}
      defaultValue={valueParser(values[selectedIndex])}
      onChange={onChange}
      lang={lang}
    >
      {values.map((value, index) => (
        <Option
          key={value + index}
          // defaultValue={selectedIndex === index}
          value={index}
          title={value}
        >
          {valueParser(value)}
        </Option>
      ))}
    </Container>
  );
};

const Container = styled.select`
  width: 100%;
  background-color: transparent;
  height: 35px;
  border: none;
  outline: none;
  border: 1px solid #ababab;
  border-radius: 8px;
  padding: 0 15px;
  cursor: pointer;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const Option = styled.option`
  width: 100%;
  text-transform: capitalize;
`;

export default SelectInput;
