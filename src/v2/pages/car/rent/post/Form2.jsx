import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import useLocale from "v2/hooks/useLocale";

const Form2 = ({ context, onKeyChange }) => {
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
            title={i18n("dailyPrice")}
            subtitle={`3-100K ${i18n("aed")}`}
            placeholder={i18n("dailyPrice")}
            value={context.dailyPrice}
            onChange={onKeyChange("dailyPrice")}
          />

          <CustomInput
            type="text"
            title={i18n("weeklyPrice")}
            subtitle={`3-100K ${i18n("aed")}`}
            placeholder={i18n("weeklyPrice")}
            value={context.weeklyPrice}
            onChange={onKeyChange("weeklyPrice")}
          />

          <CustomInput
            type="text"
            title={i18n("monthlyPrice")}
            subtitle={`3-100K ${i18n("aed")}`}
            placeholder={i18n("monthlyPrice")}
            value={context.monthlyPrice}
            onChange={onKeyChange("monthlyPrice")}
          />

          <CustomInput
            type="text"
            title={i18n("deposit")}
            subtitle={`Up To 100K ${i18n("aed")}`}
            placeholder={i18n("deposit")}
            value={context.deposit}
            onChange={onKeyChange("deposit")}
          />
        </InputsRow>

        <InputsRow lang={lang}>
          <CustomInput
            type="description"
            title={i18n("description")}
            subtitle={i18n("optional")}
            placeholder={i18n("descriptionPlaceholder")}
            value={context.description}
            onChange={onKeyChange("description")}
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

export default Form2;
