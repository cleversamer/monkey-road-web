import styled from "styled-components";

const SelectInput = ({
  values,
  selectedIndex,
  placeholder,
  onChange,
  valueParser,
}) => {
  return (
    <Container
      placeholder={placeholder}
      defaultValue={valueParser(values[selectedIndex])}
      onChange={onChange}
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
  border: 1px solid #fe7777;
  border-radius: 8px;
  padding: 0 15px;
  cursor: pointer;
`;

const Option = styled.option`
  width: 100%;
  text-transform: capitalize;
`;

export default SelectInput;
