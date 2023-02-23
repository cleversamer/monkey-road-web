import { useState } from "react";
import styled from "styled-components";
import Location from "v1/components/common/search-page/Location";
import ProfileNavigation from "v1/components/user/ProfileNavigation";
import CustomInput from "v1/components/common/custom-input";
import CustomButton from "v1/components/common/custom-button";
import Loader from "v1/components/loader";
import usersApi from "v1/api/user/users";
import useAuth from "v1/auth/useAuth";
import useLocale from "v1/hooks/useLocale";

const ChangePassword = () => {
  const { i18n, lang } = useLocale();
  const { login } = useAuth();
  const [context, setContext] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    submitting: false,
  });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value, error: "" });

  const handleChangePassword = async () => {
    let error = "";

    try {
      const isValid = checkInputValid();
      if (!isValid) return;

      setContext({ ...context, submitting: true });

      const { oldPassword, newPassword, confirmPassword } = context;
      const res = await usersApi.common.changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );

      const { user, token } = res.data;
      login(user, token);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  const checkInputValid = () => {
    const isInRange = (p) => p.length >= 8 && p.length <= 32;
    const { oldPassword, newPassword, confirmPassword } = context;
    return (
      isInRange(oldPassword) &&
      isInRange(newPassword) &&
      isInRange(confirmPassword) &&
      newPassword === confirmPassword
    );
  };

  return (
    <Container>
      <Location
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("profile"),
          i18n("arrow"),
          i18n("changePassword"),
        ]}
      />

      <Content lang={lang}>
        <ProfileNavigation activeItem="change password" />

        <FormContainer>
          <Title lang={lang}>{i18n("changePassword")}</Title>

          <BreakLine />

          <InputsContainer>
            <CustomInput
              type="password"
              title={i18n("oldPassword")}
              subtitle={`8-32 ${i18n("letters")}`}
              value={context.oldPassword}
              onChange={handleKeyChange("oldPassword")}
            />

            <CustomInput
              type="password"
              title={i18n("newPassword")}
              subtitle={`8-32 ${i18n("letters")}`}
              value={context.newPassword}
              onChange={handleKeyChange("newPassword")}
            />

            <CustomInput
              type="password"
              title={i18n("confirmPassword")}
              subtitle={`8-32 ${i18n("letters")}`}
              value={context.confirmPassword}
              onChange={handleKeyChange("confirmPassword")}
            />

            {!!context.error && (
              <ErrorText lang={lang}>{context.error}</ErrorText>
            )}
          </InputsContainer>

          <SubmitContainer lang={lang}>
            {context.submitting ? (
              <Loader />
            ) : (
              <CustomButton
                type="primary"
                title={i18n("save")}
                onClick={handleChangePassword}
              />
            )}
          </SubmitContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 30px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    max-width: 120px;
    font-size: 15px;

    @media screen and (max-width: 540px) {
      margin: 0 auto;
      max-width: 200px;
    }

    @media screen and (max-width: 400px) {
      max-width: 100%;
    }
  }
`;

const Title = styled.h3`
  color: #fe7777;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
  margin-top: 7px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};

  @media screen and (max-width: 540px) {
    justify-content: center;
  }

  div,
  button {
    max-width: 120px;
    font-size: 15px;

    @media screen and (max-width: 540px) {
      margin: 0 auto;
      max-width: 200px;
    }

    @media screen and (max-width: 400px) {
      max-width: 100%;
    }
  }
`;

export default ChangePassword;
