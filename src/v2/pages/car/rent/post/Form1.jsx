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
}) => {
  const { lang, i18n } = useLocale();

  return (
    <>
      <TitleContainer>
        <Title>{i18n("addCarFormTitle")}</Title>
        <BreakLine />
      </TitleContainer>

      <InputsContainer>
        <InputsRow lang={lang}>
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
        </InputsRow>

        <InputsRow lang={lang}>
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
        </InputsRow>
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

const InputsRow = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 12px;
`;

export default Form1;
