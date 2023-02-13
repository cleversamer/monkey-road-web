import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SharedForm from "components/common/shared-form";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import ResendCode from "components/common/resend-code";
import Loader from "components/loader";
import usersApi from "api/user/users";
import useAuth from "auth/useAuth";
import { routes } from "client";
import useLocale from "hooks/useLocale";

const PhoneForm = () => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();
  const { subject } = useParams(); // email or phone
  const { user, setUser } = useAuth();
  const [context, setContext] = useState({
    lang: "en",
    code: "",
    error: "",
    submitting: false,
  });

  useEffect(() => {
    const isSupported = ["email", "phone"].includes(subject.trim());
    if (!isSupported) {
      navigate(routes.verify.navigate("email"));
    }

    if (user.verified.email) {
      navigate(routes.verify.navigate("phone"));
    }

    if (user.verified.phone) {
      navigate(routes.verify.navigate("email"));
    }
  }, []);

  const handleCodeChange = (e) => {
    const { value } = e.target;

    if (value.length === 5) return;

    for (let i = 0; i < value.length; i++) {
      const ascii = value.charCodeAt(i);
      if (ascii < 48 || ascii > 57) {
        return;
      }
    }

    setContext({ ...context, code: value, error: "" });
  };

  const handleSubmit = async (e) => {
    let error = "";

    try {
      e?.preventDefault();
      if (context.code.length !== 4) return;

      setContext({ ...context, submitting: true });

      const res = await usersApi.common.verify(subject, context.code);
      setUser(res.data);
      navigate(routes.personalInfo.navigate());
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  const handleResendCode = async (e) => {
    let error = "";

    try {
      e?.preventDefault();

      setContext({ ...context, submitting: true });

      await usersApi.common.resendVerificationCode(subject, context.lang);
    } catch (err) {
      error = err?.response?.data?.message?.en || "Network error";
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/verification.svg"
      title={i18n(`${subject}VerificationTitle`)}
      subtitle={i18n(`${subject}VerificationSubtitle`)}
      onSubmit={handleSubmit}
    >
      <CustomInput
        type="code"
        value={context.code}
        onChange={handleCodeChange}
        placeholder="0000"
      />

      {!!context.error && <ErrorText>{context.error}</ErrorText>}

      {context.submitting ? (
        <Loader />
      ) : (
        <CustomButton
          type="primary"
          title={i18n("verify")}
          onClick={handleSubmit}
        />
      )}

      <ResendCode seconds={60} onResend={handleResendCode} />
    </SharedForm>
  );
};

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
  margin-top: -7px;
`;

export default PhoneForm;
