import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedForm from "components/common/shared-form";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import usersApi from "api/user/users";
import Loader from "components/loader";
import { routes } from "client";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [context, setContext] = useState({
    lang: "en",
    sendTo: "email",
    emailOrPhone: "",
    error: "",
    successMssg: "",
    submitting: false,
  });

  const handleChange = (e) =>
    setContext({ ...context, emailOrPhone: e.target.value, error: "" });

  const handleSubmit = async (e) => {
    let error = "";

    try {
      e.preventDefault();

      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const { lang, sendTo, emailOrPhone } = context;
      await usersApi.common.getForgotPasswordCode(lang, sendTo, emailOrPhone);
      navigate(routes.resetPassword.navigate(context.emailOrPhone));
    } catch (err) {
      error = err?.response?.data?.message?.en || "Network error";
    } finally {
      setContext({ ...context, submitting: false, error });
    }
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
        value={context.emailOrPhone}
        onChange={handleChange}
      />

      {!!context.error && <ErrorText>{context.error}</ErrorText>}

      {/* <ReceiverTypes>
        <ReceiverTitle>Send to:</ReceiverTitle>
        <CustomInput type="radio" title="Email" />
        <CustomInput type="radio" title="Phone" />
      </ReceiverTypes> */}

      {context.submitting ? (
        <Loader />
      ) : (
        <CustomButton type="primary" title="Send code" onClick={handleSubmit} />
      )}
    </SharedForm>
  );
};

const ReceiverTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const ReceiverTypes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    font-size: 13px;
  }
`;

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
  margin-top: -7px;
`;

export default ForgotPasswordForm;
