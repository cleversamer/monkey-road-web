import styled from "styled-components";
import CustomInput from "components/common/custom-input";

const Form2 = ({ context, onKeyChange }) => {
  return (
    <>
      <FormTitle>Tell us about your car</FormTitle>

      <CustomInput
        type="text"
        title="Price"
        subtitle="AED"
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
        icc={context.icc}
        nsn={context.nsn}
      />

      <CustomInput
        type="description"
        title="Description"
        subtitle="optional"
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
