import { useState } from "react";
import useQueryParams from "hooks/useQueryParams";
import SharedForm from "components/common/shared-form";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";

const PhoneForm = () => {
  const { joinBy } = useQueryParams();
  const [context, setContext] = useState({ icc: "+971", nsn: "" });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: register by Google or Facebook
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/fast-login.svg"
      title="Enter your phone number"
      subtitle="We will send you a verification code."
      onSubmit={handleSubmit}
    >
      <CustomInput
        type="phone"
        title="Phone number"
        icc={context.icc}
        onICCChange={handleKeyChange("icc")}
        nsn={context.nsn}
        onNSNChange={handleKeyChange("nsn")}
      />

      <CustomButton
        type="primary"
        title="Send the code"
        onClick={handleSubmit}
      />
    </SharedForm>
  );
};

export default PhoneForm;
