import styled from "styled-components";
import CustomInput from "components/common/custom-input";

const Form2 = ({ context, onKeyChange }) => {
  return (
    <>
      <FormTitle>Tell us about your car</FormTitle>

      <CustomInput
        type="text"
        title="Daily price"
        subtitle="AED"
        placeholder="Daily price"
        value={context.dailyPrice}
        onChange={onKeyChange("dailyPrice")}
      />

      <CustomInput
        type="text"
        title="Monthly price"
        subtitle="AED"
        placeholder="Monthly price"
        value={context.monthlyPrice}
        onChange={onKeyChange("monthlyPrice")}
      />

      <CustomInput
        type="text"
        title="Weekly price"
        subtitle="AED"
        placeholder="Weekly price"
        value={context.weeklyPrice}
        onChange={onKeyChange("weeklyPrice")}
      />

      <CustomInput
        type="text"
        title="Deposit"
        subtitle="AED"
        placeholder="Deposit"
        value={context.deposit}
        onChange={onKeyChange("deposit")}
      />

      <CustomInput
        type="description"
        title="Description"
        subtitle="Optional"
        placeholder="Describe your car"
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