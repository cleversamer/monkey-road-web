import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import useLocale from "hooks/useLocale";

const Form2 = ({ context, onKeyChange }) => {
  const { i18n } = useLocale();

  return (
    <>
      <FormTitle>{i18n("addCarFormTitle")}</FormTitle>

      <CustomInput
        type="text"
        title={i18n("dailyPrice")}
        subtitle={`3-100,000 ${i18n("aed")}`}
        placeholder={i18n("dailyPrice")}
        value={context.dailyPrice}
        onChange={onKeyChange("dailyPrice")}
      />

      <CustomInput
        type="text"
        title={i18n("weeklyPrice")}
        subtitle={`3-100,000 ${i18n("aed")}`}
        placeholder={i18n("weeklyPrice")}
        value={context.weeklyPrice}
        onChange={onKeyChange("weeklyPrice")}
      />

      <CustomInput
        type="text"
        title={i18n("monthlyPrice")}
        subtitle={`3-100,000 ${i18n("aed")}`}
        placeholder={i18n("monthlyPrice")}
        value={context.monthlyPrice}
        onChange={onKeyChange("monthlyPrice")}
      />

      <CustomInput
        type="text"
        title={i18n("deposit")}
        subtitle={`0-100,000 ${i18n("aed")}`}
        placeholder={i18n("deposit")}
        value={context.deposit}
        onChange={onKeyChange("deposit")}
      />

      <CustomInput
        type="description"
        title={i18n("description")}
        subtitle={i18n("optional")}
        placeholder={i18n("descriptionPlaceholder")}
        value={context.description}
        onChange={onKeyChange("description")}
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

export default Form2;
