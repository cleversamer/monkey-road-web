import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import useLocale from "v2/hooks/useLocale";

const Form1 = ({
  entries,
  context,
  onKeyChange,
  colorParser,
  brandParser,
  yearParser,
  trimLevelParser,
  vehicleTypeParser,
  fuelTypeParser,
  seatsNumberPaeser,
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
        title={i18n("vinNumber")}
        placeholder={i18n("vinNumber")}
        subtitle={`17 ${i18n("letters")}`}
        value={context.vin}
        onChange={onKeyChange("vin")}
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
        title={i18n("yearModel")}
        placeholder={i18n("yearModel")}
        value={context.yearIndex}
        values={entries.years}
        valueParser={yearParser}
        selectedIndex={context.yearIndex}
        onChange={onKeyChange("yearIndex")}
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
        title={i18n("trimLevel")}
        placeholder={i18n("trimLevel")}
        value={context.trimLevelIndex}
        values={entries.trimLevels}
        valueParser={trimLevelParser}
        selectedIndex={context.trimLevelIndex}
        onChange={onKeyChange("trimLevelIndex")}
      />

      <CustomInput
        type="select"
        title={i18n("vehicleType")}
        placeholder={i18n("vehicleType")}
        value={context.vehicleTypeIndex}
        values={entries.vehicleTypes}
        valueParser={vehicleTypeParser}
        selectedIndex={context.vehicleTypeIndex}
        onChange={onKeyChange("vehicleTypeIndex")}
      />

      <CustomInput
        type="select"
        title={i18n("fuelType")}
        placeholder={i18n("fuelType")}
        value={context.fuelTypeIndex}
        values={entries.fuelTypes}
        valueParser={fuelTypeParser}
        selectedIndex={context.fuelTypeIndex}
        onChange={onKeyChange("fuelTypeIndex")}
      />

      <CustomInput
        type="select"
        title={i18n("noOfSeats")}
        placeholder={i18n("noOfSeats")}
        value={context.noOfSeatsIndex}
        values={entries.seatsNumbers}
        valueParser={seatsNumberPaeser}
        selectedIndex={context.noOfSeatsIndex}
        onChange={onKeyChange("noOfSeatsIndex")}
      />

      <CustomInput
        type="text"
        title={i18n("kiloPerHour")}
        subtitle={`95-105 ${i18n("kmph")}`}
        placeholder={i18n("kiloPerHour")}
        value={context.kiloPerHour}
        onChange={onKeyChange("kiloPerHour")}
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
