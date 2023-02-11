import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import useLocale from "hooks/useLocale";

const Form1 = ({
  entries,
  context,
  onKeyChange,
  colorParser,
  brandParser,
  yearParser,
}) => {
  const { i18n } = useLocale();

  return (
    <>
      <FormTitle>{i18n("addCarFormTitle")}</FormTitle>

      <CustomInput
        type="text"
        title={i18n("carName")}
        subtitle={`3-64 ${i18n("letters")}`}
        placeholder={i18n("carName")}
        value={context.carName}
        onChange={onKeyChange("carName")}
      />

      <CustomInput
        type="text"
        title={i18n("carModel")}
        subtitle={`3-64 ${i18n("letters")}`}
        placeholder={i18n("carModel")}
        value={context.model}
        onChange={onKeyChange("model")}
      />

      <CustomInput
        type="select"
        title={i18n("color")}
        placeholder={i18n("color")}
        value={context.colorIndex}
        values={entries.colors}
        valueParser={colorParser}
        selectedIndex={context.colorIndex}
        onChange={onKeyChange("colorIndex")}
      />

      <CustomInput
        type="select"
        title={i18n("brand")}
        placeholder={i18n("brand")}
        value={context.brandIndex}
        values={entries.brands}
        valueParser={brandParser}
        selectedIndex={context.brandIndex}
        onChange={onKeyChange("brandIndex")}
      />

      <CustomInput
        type="select"
        title={i18n("year")}
        placeholder={i18n("year")}
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
