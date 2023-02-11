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
        title={i18n("price")}
        subtitle={`1-1M ${i18n("aed")}`}
        placeholder={i18n("price")}
        value={context.price}
        onChange={onKeyChange("price")}
      />

      <CustomInput
        type="phone"
        title={i18n("phoneNumber")}
        primary
        onICCChange={onKeyChange("phoneICC")}
        onNSNChange={onKeyChange("phoneNSN")}
        icc={context.phoneICC}
        nsn={context.phoneNSN}
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
