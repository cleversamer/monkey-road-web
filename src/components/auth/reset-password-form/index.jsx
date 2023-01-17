import { useState } from "react";
import SharedForm from "components/common/shared-form";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";

const ResetPasswordForm = () => {
  const [context, setContext] = useState({ password: "", confirmPassowrd: "" });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

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
        type="password"
        title="Password"
        value={context.password}
        onChange={handleKeyChange("password")}
      />

      <CustomInput
        type="password"
        title="Confirm password"
        value={context.confirmPassowrd}
        onChange={handleKeyChange("confirmPassowrd")}
      />

      <CustomButton
        type="primary"
        title="Reset password"
        onClick={handleSubmit}
      />
    </SharedForm>
  );
};

export default ResetPasswordForm;
