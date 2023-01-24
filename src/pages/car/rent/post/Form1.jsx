import styled from "styled-components";
import CustomInput from "components/common/custom-input";

const Form1 = ({
  entries,
  context,
  onKeyChange,
  colorParser,
  brandParser,
  yearParser,
}) => {
  return (
    <>
      <FormTitle>Tell us about your car</FormTitle>

      <CustomInput
        type="text"
        title="Car name"
        placeholder="Car name"
        value={context.carName}
        onChange={onKeyChange("carName")}
      />

      <CustomInput
        type="text"
        title="Model"
        placeholder="Model"
        value={context.model}
        onChange={onKeyChange("model")}
      />

      <CustomInput
        type="select"
        title="Color"
        placeholder="Color"
        value={context.color}
        values={entries.colors}
        valueParser={colorParser}
        selectedIndex={context.colorIndex}
        onChange={onKeyChange("colorIndex")}
      />

      <CustomInput
        type="select"
        title="Brand"
        placeholder="Brand"
        value={context.brandIndex}
        values={entries.brands}
        valueParser={brandParser}
        selectedIndex={context.brandIndex}
        onChange={onKeyChange("brandIndex")}
      />

      <CustomInput
        type="select"
        title="Year"
        placeholder="Year"
        value={context.yearIndex}
        values={entries.years}
        valueParser={yearParser}
        selectedIndex={context.yearIndex}
        onChange={onKeyChange("yearIndex")}
      />
    </>
  );
};

const FormTitle = styled.h3`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 24px;
    text-align: center;
  }
`;

export default Form1;
