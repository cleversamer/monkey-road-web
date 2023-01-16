import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";

const LoginForm = () => {
  const [context, setContext] = useState({
    authType: "email",
    emailOrPhone: "",
    password: "",
    rememberMe: true,
  });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

  const handleToggleRememberMe = () =>
    setContext({ ...context, rememberMe: !context.rememberMe });

  const handleLoginWithEmailOrPhone = () => {};

  const handleLoginWithGoogle = () => {};

  const handleLoginWithFacebook = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: submit login credentials
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Content>
        <Heading>
          <Title>Welcome</Title>
          <Subtitle>Sign in to continue</Subtitle>
        </Heading>

        <CustomInput
          type="email"
          title="Email or phone number"
          value={context.emailOrPhone}
          onChange={handleKeyChange("emailOrPhone")}
        />

        <CustomInput
          type="password"
          title="Password"
          value={context.password}
          onChange={handleKeyChange("password")}
        />

        <LowerContainer>
          <CustomInput
            id="remember-me"
            type="checkbox"
            title="Remember me"
            value={context.rememberMe}
            onChange={handleToggleRememberMe}
          />

          <ForgotPasswordRoute to="">Forgot password?</ForgotPasswordRoute>
        </LowerContainer>

        <CustomButton
          type="primary"
          title="Login"
          onClick={handleLoginWithEmailOrPhone}
        />

        <BreakLineContainer>
          <BreakLine />
          <BreakLineWord>or</BreakLineWord>
          <BreakLine />
        </BreakLineContainer>

        <CustomButton type="google" onClick={handleLoginWithGoogle} />

        <CustomButton type="facebook" onClick={handleLoginWithFacebook} />

        <RegisterContainer>
          <RegisterPhrase>Don't have an account?</RegisterPhrase>
          <RegisterRoute to="">Register</RegisterRoute>
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
  height: 560px;
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
  text-transform: capitalize;
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
  justify-content: center;
  gap: 5px;
  font-size: 15px;
  margin-top: 5px;
`;

const RegisterPhrase = styled.p`
  text-align: center;
  text-transform: capitalize;
`;

const RegisterRoute = styled(Link)`
  color: #fe7777;
  text-decoration: underline;
`;

export default LoginForm;
