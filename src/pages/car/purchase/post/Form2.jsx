import styled from "styled-components";
import CustomInput from "components/common/custom-input";

const Form2 = ({ context, onKeyChange }) => {
  return (
    <>
      <FormTitle>Tell us about your car</FormTitle>

      <CustomInput
        type="text"
        title="Price"
        subtitle="1-1M AED"
        placeholder="Price"
        value={context.price}
        onChange={onKeyChange("price")}
      />

      <CustomInput
        type="phone"
        title="Phone number"
        primary
        onICCChange={onKeyChange("phoneICC")}
        onNSNChange={onKeyChange("phoneNSN")}
        icc={context.phoneICC}
        nsn={context.phoneNSN}
      />

      <CustomInput
        type="description"
        title="Description"
        subtitle="optional"
        placeholder="Describe your car (0-1024 letters)"
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
