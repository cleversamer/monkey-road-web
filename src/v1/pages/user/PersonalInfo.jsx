import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "v1/components/common/search-page/Location";
import ProfileNavigation from "v1/components/user/ProfileNavigation";
import CustomInput from "v1/components/common/custom-input";
import CustomButton from "v1/components/common/custom-button";
import Loader from "v1/components/loader";
import { routes } from "v1/client";
import useAuth from "v1/auth/useAuth";
import parseDate from "v1/utils/parseDate";
import usersApi from "v1/api/user/users";
import useLocale from "v1/hooks/useLocale";

const PersonalInfo = () => {
  const { i18n, lang } = useLocale();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [lastLogin, setLastLogin] = useState(parseDate(user.lastLogin, lang));
  const [context, setContext] = useState({
    lang: lang,
    name: user.name,
    email: user.email,
    phoneICC: user.phone.icc,
    phoneNSN: user.phone.nsn,
    changes: [],
    error: "",
    submitting: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastLogin(parseDate(user.lastLogin, lang));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lang]);

  const handleKeyChange = (key) => (e) => {
    let newChanges = [...context.changes];
    if (!context.changes.includes(key)) {
      newChanges.push(key);
    }

    setContext({
      ...context,
      error: "",
      changes: newChanges,
      [key]: e.target.value,
    });
  };

  const handleEditProfile = async () => {
    let error = "";

    try {
      if (!context.changes.length) return;
      setContext({ ...context, submitting: true });

      const changes = {
        lang: context.lang,
        ...context,
      };

      const res = await usersApi.common.updateProfile(changes);
      const { user, token } = res.data;
      login(user, token);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, changes: [], error });
    }
  };

  const handleVerifyEmail = () => {
    navigate(routes.verify.navigate("email"));
  };

  const handleVerifyPhone = () => {
    navigate(routes.verify.navigate("phone"));
  };

  return (
    <Container>
      <Location
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("profile"),
          i18n("arrow"),
          i18n("personalInfo"),
        ]}
      />

      <Content lang={lang}>
        <ProfileNavigation activeItem="personal info" />

        <FormContainer>
          <Title lang={lang}>{i18n("personalInfo")}</Title>

          <BreakLine />

          <LastLoginContainer lang={lang}>
            <LastLoginItem>
              {lang === "ar" && ":"}
              {i18n("lastLogin")}
              {lang === "en" && ":"}
            </LastLoginItem>
            <LastLoginItem>
              {lang === "ar" && i18n("ago")} {lastLogin}{" "}
              {lang === "en" && i18n("ago")}
            </LastLoginItem>
          </LastLoginContainer>

          <InputsContainer>
            <CustomInput
              type="name"
              title={i18n("fullName")}
              placeholder={i18n("samerAlsaadawi")}
              value={context.name}
              onChange={handleKeyChange("name")}
            />

            <CustomInput
              type="email"
              title={i18n("email")}
              subtitle={i18n("compulsory")}
              placeholder={i18n("email")}
              verified={user.verified.email}
              onVerify={handleVerifyEmail}
              profile
              value={context.email}
              onChange={handleKeyChange("email")}
            />

            <CustomInput
              type="phone"
              title={i18n("phoneNumber")}
              subtitle={i18n("optional")}
              placeholder={i18n("phoneNumber")}
              verified={user.verified.phone}
              onVerify={handleVerifyPhone}
              profile
              icc={context.phoneICC}
              nsn={context.phoneNSN}
              onICCChange={handleKeyChange("phoneICC")}
              onNSNChange={handleKeyChange("phoneNSN")}
            />

            <CustomInput
              type="name"
              title={i18n("role")}
              placeholder={i18n("role")}
              disabled
              value={i18n(user.role)}
            />
          </InputsContainer>

          {!!context.error && (
            <ErrorText lang={lang}>{context.error}</ErrorText>
          )}

          <SubmitContainer lang={lang}>
            {context.submitting ? (
              <Loader />
            ) : (
              <CustomButton
                type="primary"
                title={context.changes.length ? i18n("save") : i18n("edit")}
                disabled={!context.changes.length}
                onClick={handleEditProfile}
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
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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

const LastLoginContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
`;

const LastLoginItem = styled.div`
  :first-child {
    text-transform: capitalize;
    font-weight: 600;
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 15px;

  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
  margin-top: 7px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

export default PersonalInfo;
