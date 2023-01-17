import { useState } from "react";
import { useParams } from "react-router-dom";
import SharedForm from "components/common/shared-form";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import ResendCode from "components/common/resend-code";

const PhoneForm = () => {
  const { subject } = useParams(); // email or phone
  const [code, setCode] = useState("");

  const handleCodeChange = (e) => setCode(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: register by Google or Facebook
  };

  const handleSendCode = (e) => {
    console.log("Sending code...");
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/fast-login.svg"
      title="Enter your phone number"
      subtitle="We will send you a verification code."
      onSubmit={handleSubmit}
    >
      <CustomInput
        type="code"
        value={code}
        onChange={handleCodeChange}
        placeholder="0000"
      />

      <CustomButton type="primary" title="Verify" onClick={handleSubmit} />

      <ResendCode seconds={60} onSend={handleSendCode} />
    </SharedForm>
  );
};

export default PhoneForm;
