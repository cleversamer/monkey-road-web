import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedForm from "v2/components/common/shared-form";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";
import usersApi from "v2/api/user/users";
import Loader from "v2/components/loader";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";

const ForgotPasswordForm = () => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();
  const [context, setContext] = useState({
    lang: lang,
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
      error = err?.response?.data?.message[lang] || i18n("etworkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/forgot-password.svg"
      title={i18n("forgotPasswordTitle")}
      subtitle={i18n("forgotPasswordSubtitle")}
      onSubmit={handleSubmit}
    >
      <CustomInput
        type="emailorphone"
        title={i18n("emailOrPhone")}
        value={context.emailOrPhone}
        onChange={handleChange}
      />

      {!!context.error && <ErrorText>{context.error}</ErrorText>}

      {context.submitting ? (
        <Loader />
      ) : (
        <CustomButton
          type="primary"
          title={i18n("sendCode")}
          onClick={handleSubmit}
        />
      )}
    </SharedForm>
  );
};

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
  margin-top: -7px;
`;

export default ForgotPasswordForm;
