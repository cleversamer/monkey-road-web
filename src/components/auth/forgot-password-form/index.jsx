import { useState } from "react";
import SharedForm from "components/common/shared-form";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";

const ForgotPasswordForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleChange = (e) => setEmailOrPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: register by Google or Facebook
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/forgot-password.svg"
      title="Forgot Your Password?"
      subtitle="We will send you a verification code."
      onSubmit={handleSubmit}
    >
      <CustomInput
        type="emailorphone"
        title="Email or phone number"
        value={emailOrPhone}
        onChange={handleChange}
      />

      <CustomButton
        type="primary"
        title="Send verification code"
        onClick={handleSubmit}
      />
    </SharedForm>
  );
};

export default ForgotPasswordForm;