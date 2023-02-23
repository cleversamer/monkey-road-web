import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "v2/hooks/useQueryParams";
import SharedForm from "v2/components/common/shared-form";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";
import authApi from "v2/api/user/auth";
import Loader from "v2/components/loader";
import useAuth from "v2/auth/useAuth";

const PhoneForm = () => {
  const { i18n, lang } = useLocale();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { joinBy } = useQueryParams();
  const [context, setContext] = useState({
    icc: "+971",
    nsn: "",
    error: "",
    submitting: false,
  });

  useEffect(() => {
    if (joinBy !== "google") {
      navigate(routes.fastRegister.navigate("google"));
    }
  }, []);

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value, error: "" });

  const handleSubmit = async (e) => {
    let error = "";

    try {
      e.preventDefault();

      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const body = {
        phoneICC: context.icc,
        phoneNSN: context.nsn,
      };
      const res = await authApi.registerWithGoogle(body);

      navigate(routes.home.navigate());
      const { user, token } = res.data;
      login(user, token);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/phone.svg"
      title={i18n("enterPhone")}
      subtitle={i18n("fastRegisterSubtitle")}
      onSubmit={handleSubmit}
    >
      <CustomInput
        type="phone"
        title={i18n("phoneNumber")}
        icc={context.icc}
        onICCChange={handleKeyChange("icc")}
        nsn={context.nsn}
        onNSNChange={handleKeyChange("nsn")}
      />

      {!!context.error && <ErrorText>{context.error}</ErrorText>}

      {context.submitting ? (
        <Loader />
      ) : (
        <CustomButton
          type="primary"
          title={i18n("register")}
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
  margin: -5px 0;
`;

export default PhoneForm;
