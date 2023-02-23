import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import CustomInput from "v1/components/common/custom-input";
import CustomButton from "v1/components/common/custom-button";
import { routes } from "v1/client";
import useAuth from "v1/auth/useAuth";
import authApi from "v1/api/user/auth";
import Loader from "v1/components/loader";
import useLocale from "v1/hooks/useLocale";

const LoginForm = () => {
  const { i18n, lang } = useLocale();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [context, setContext] = useState({
    authType: "email",
    emailOrPhone: "",
    password: "",
    rememberMe: true,
    submitting: false,
    error: "",
  });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, error: "", [key]: e.target.value });

  const handleToggleRememberMe = () =>
    setContext({ ...context, rememberMe: !context.rememberMe });

  const handleLoginWithGoogle = async () => {
    let error = "";

    try {
      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const res = await authApi.loginWithGoogle();

      const { user, token } = res.data;
      login(user, token);

      const nextPage = user.verified.email
        ? routes.home.navigate()
        : routes.verify.navigate();
      navigate(nextPage);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  const handleLoginWithEmailOrPhone = async () => {
    let error = "";

    try {
      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const { emailOrPhone, password } = context;
      const res = await authApi.loginWithEmail({ emailOrPhone, password });

      const { user, token } = res.data;
      login(user, token);

      const nextPage = user.verified.email
        ? routes.home.navigate()
        : routes.verify.navigate();
      navigate(nextPage);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <Content>
        <Heading>
          <Title>{i18n("welcome")}</Title>
          <Subtitle>{i18n("loginFormSubtitle")}</Subtitle>
        </Heading>

        <CustomInput
          type="emailorphone"
          title={i18n("emailOrPhone")}
          value={context.emailOrPhone}
          onChange={handleKeyChange("emailOrPhone")}
        />

        <ErrorWrapper>
          <CustomInput
            type="password"
            title={i18n("password")}
            value={context.password}
            onChange={handleKeyChange("password")}
          />

          {!!context.error && (
            <ErrorText lang={lang}>{context.error}</ErrorText>
          )}
        </ErrorWrapper>

        <LowerContainer>
          <CustomInput
            id="remember-me"
            type="checkbox"
            title={i18n("rememberMe")}
            value={context.rememberMe}
            onChange={handleToggleRememberMe}
          />

          <ForgotPasswordRoute to={routes.forgotPassword.navigate()}>
            {i18n("loginForgotPassword")}
          </ForgotPasswordRoute>
        </LowerContainer>

        {context.submitting ? (
          <Loader />
        ) : (
          <CustomButton
            type="primary"
            title={i18n("loginTitle")}
            onClick={handleLoginWithEmailOrPhone}
          />
        )}

        <BreakLineContainer>
          <BreakLine />
          <BreakLineWord>{i18n("or")}</BreakLineWord>
          <BreakLine />
        </BreakLineContainer>

        <CustomButton type="google" onClick={handleLoginWithGoogle} />

        {/* <CustomButton type="facebook" onClick={handleLoginWithFacebook} /> */}

        <RegisterContainer lang={lang}>
          <RegisterPhrase>{i18n("dontHaveAcc")}</RegisterPhrase>
          <RegisterRoute to={routes.register.navigate()}>
            {i18n("register")}
          </RegisterRoute>
        </RegisterContainer>
      </Content>
    </Container>
  );
};

const Container = styled.form`
  background: #fff;
  border-radius: 16px;
  max-width: 500px;
  margin: 0 auto;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
`;

const Heading = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 400;
`;

const LowerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ForgotPasswordRoute = styled(Link)`
  color: #fe7777;
  font-size: 12px;
  text-decoration: underline;
`;

const BreakLineContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 224px;
  height: 0px;
  border: 1px solid #aaa;
`;

const BreakLineWord = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: center;
  gap: 5px;
  font-size: 15px;
  margin-top: 5px;
`;

const RegisterPhrase = styled.p`
  text-align: center;
  text-transform: none;
`;

const RegisterRoute = styled(Link)`
  color: #fe7777;
  text-decoration: underline;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
  margin-top: 7px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

export default LoginForm;
