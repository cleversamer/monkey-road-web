import styled from "styled-components";
import CustomInput from "components/common/custom-input";

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
  return (
    <>
      <FormTitle>Tell us about your car</FormTitle>

      <CustomInput
        type="text"
        title="Car name"
        subtitle="3-64 letters"
        placeholder="Car name"
        value={context.carName}
        onChange={onKeyChange("carName")}
      />

      <CustomInput
        type="text"
        title="VIN Number"
        placeholder="VIN Number"
        subtitle="17 letters"
        value={context.vin}
        onChange={onKeyChange("vin")}
      />

      <CustomInput
        type="text"
        title="Model"
        subtitle="3-64 letters"
        placeholder="Model"
        value={context.model}
        onChange={onKeyChange("model")}
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

      <CustomInput
        type="select"
        title="Color"
        placeholder="Color"
        value={context.colorIndex}
        values={entries.colors}
        valueParser={colorParser}
        selectedIndex={context.colorIndex}
        onChange={onKeyChange("colorIndex")}
      />

      <CustomInput
        type="select"
        title="Trim level"
        placeholder="Trim level"
        value={context.trimLevelIndex}
        values={entries.trimLevels}
        valueParser={trimLevelParser}
        selectedIndex={context.trimLevelIndex}
        onChange={onKeyChange("trimLevelIndex")}
      />

      <CustomInput
        type="select"
        title="Vehicle type"
        placeholder="Vehicle type"
        value={context.vehicleTypeIndex}
        values={entries.vehicleTypes}
        valueParser={vehicleTypeParser}
        selectedIndex={context.vehicleTypeIndex}
        onChange={onKeyChange("vehicleTypeIndex")}
      />

      <CustomInput
        type="select"
        title="Fuel type"
        placeholder="Fuel type"
        value={context.fuelTypeIndex}
        values={entries.fuelTypes}
        valueParser={fuelTypeParser}
        selectedIndex={context.fuelTypeIndex}
        onChange={onKeyChange("fuelTypeIndex")}
      />

      <CustomInput
        type="select"
        title="NO. of seats"
        placeholder="NO. of seats"
        value={context.noOfSeatsIndex}
        values={entries.seatsNumbers}
        valueParser={seatsNumberPaeser}
        selectedIndex={context.noOfSeatsIndex}
        onChange={onKeyChange("noOfSeatsIndex")}
      />

      <CustomInput
        type="text"
        title="Kilo per hour"
        subtitle="95-105 km/h"
        placeholder="Kilo per hour"
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
