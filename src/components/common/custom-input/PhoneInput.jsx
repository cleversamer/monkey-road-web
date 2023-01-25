import styled from "styled-components";
import countries from "../../../static/countries.json";

const PhoneInput = ({ primary, icc, nsn, onICCChange, onNSNChange }) => {
  return (
    <Container>
      <SelectMenu primary={primary} defaultValue={icc} onChange={onICCChange}>
        {countries.map((country) => {
          const selected = icc === country.icc;

          return (
            <Option
              key={country.icc}
              defaultValue={selected}
              value={country.icc}
              title={country.icc}
            >
              {selected ? country.icc : `${country.name} ${country.icc}`}
            </Option>
          );
        })}
      </SelectMenu>

      <Input
        type="tel"
        placeholder="58 564 1444"
        value={nsn}
        autoComplete="true"
        primary={primary}
        onChange={onNSNChange}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SelectMenu = styled.select`
  flex: 0.22;
  width: 22%;
  background-color: ${({ primary }) => (primary ? "#fafafa" : "#f4f4f4")};
  height: 35px;
  border: ${({ primary }) => (primary ? "1px solid #fe7777" : "none")};
  outline: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Option = styled.option`
  width: 100%;
`;

const Input = styled.input`
  flex: 0.78;
  width: 78%;
  height: 35px;
  border: ${({ primary }) => (primary ? "1px solid #fe7777" : "none")};
  outline: none;
  border-radius: 6px;
  padding: 0 10px;
  background-color: ${({ primary }) => (primary ? "#fafafa" : "#f4f4f4")};
`;

export default PhoneInput;
