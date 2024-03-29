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
  const { lang, i18n } = useLocale();

  return (
    <>
      <TitleContainer>
        <Title>{i18n("addCarFormTitle")}</Title>
        <BreakLine />
      </TitleContainer>

      <InputsContainer>
        <InputsRow3 lang={lang}>
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
        </InputsRow3>

        <InputsRow4 lang={lang}>
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
        </InputsRow4>

        <InputsRow4 lang={lang}>
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
        </InputsRow4>
      </InputsContainer>
    </>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 24px;
    text-align: center;
  }
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputsRow3 = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

const InputsRow4 = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

export default Form1;
