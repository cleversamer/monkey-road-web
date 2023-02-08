import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import { routes } from "client";
import useAuth from "auth/useAuth";
import authApi from "api/user/auth";
import Loader from "components/loader";

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [context, setContext] = useState({
    lang: "en",
    authType: "email",
    name: "",
    email: "",
    phoneICC: "+971",
    phoneNSN: "",
    password: "",
    error: "",
    submitting: false,
  });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

  const handleRegisterWithEmailAndPhone = () => {};

  const handleSubmit = async (e) => {
    let error = "";
    try {
      e.preventDefault();

      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const { lang, name, email, phoneICC, phoneNSN, password, authType } =
        context;
      const res = await authApi.registerWithEmail(
        lang,
        name,
        email,
        phoneICC,
        phoneNSN,
        password,
        authType
      );

      navigate(routes.verify.navigate("phone"));
      const { user, token } = res.data;
      login(user, token);
    } catch (err) {
      error = err?.response?.data?.message?.en || "Network error";
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Content>
        <Heading>
          <Title>Welcome</Title>
          <Subtitle>Sign up to continue</Subtitle>
        </Heading>

        <CustomInput
          type="name"
          title="Full name"
          value={context.name}
          onChange={handleKeyChange("name")}
        />

        <CustomInput
          type="email"
          title="Email"
          value={context.email}
          onChange={handleKeyChange("email")}
        />

        <CustomInput
          type="phone"
          title="Phone number"
          icc={context.phoneICC}
          onICCChange={handleKeyChange("phoneICC")}
          nsn={context.phoneNSN}
          onNSNChange={handleKeyChange("phoneNSN")}
        />

        <ErrorWrapper>
          <CustomInput
            type="password"
            title="Password"
            value={context.password}
            onChange={handleKeyChange("password")}
          />

          {!!context.error && <ErrorText>{context.error}</ErrorText>}
        </ErrorWrapper>

        <Terms to={routes.home.navigate()}>
          By clicking “Register“, I agree to{" "}
          <span>terms of condition &amp; privacy policy.</span>
        </Terms>

        {context.submitting ? (
          <Loader />
        ) : (
          <CustomButton
            type="primary"
            title="Register"
            onClick={handleRegisterWithEmailAndPhone}
          />
        )}

        <BreakLineContainer>
          <BreakLine />
          <BreakLineWord>or</BreakLineWord>
          <BreakLine />
        </BreakLineContainer>

        <RouterLink to={routes.fastRegister.navigate("google")}>
          <CustomButton type="google" />
        </RouterLink>

        <RouterLink to={routes.fastRegister.navigate("facebook")}>
          <CustomButton type="facebook" />
        </RouterLink>

        <RegisterContainer>
          <RegisterPhrase>Already have an account?</RegisterPhrase>
          <RegisterRoute to={routes.login.navigate()}>Login</RegisterRoute>
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
  min-height: 560px;
  padding: 30px 0;
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

const Terms = styled(RouterLink)`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  line-height: 19.5px;
  text-transform: capitalize;

  span {
    color: #0500ff;
  }
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
  justify-content: center;
  gap: 5px;
  font-size: 15px;
  margin-top: 5px;
`;

const RegisterPhrase = styled.p`
  text-align: center;
`;

const RegisterRoute = styled(RouterLink)`
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
`;

export default RegisterForm;
