import { useEffect, useState } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import parseDate from "v2/utils/parseDate";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";
import Loader from "v2/components/loader";

const SecretaryUserSearchForm = ({
  context,
  user,
  onKeyChange,
  onEditProfile,
}) => {
  const { i18n, lang } = useLocale();
  const [lastLogin, setLastLogin] = useState(parseDate(user?.lastLogin, lang));

  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(() => {
      setLastLogin(parseDate(user.lastLogin, lang));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lang, user]);

  return (
    <FormContainer>
      <Title lang={lang}>{i18n("personalInfo")}</Title>

      <BreakLine />

      {user && (
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
      )}

      <InputsContainer>
        <CustomInput
          type="name"
          title={i18n("fullName")}
          placeholder={i18n("samerAlsaadawi")}
          value={context.name}
          onChange={onKeyChange("name")}
        />

        <CustomInput
          type="email"
          title={i18n("email")}
          placeholder={i18n("email")}
          verified={user?.verified?.email}
          profile={!!user}
          value={context.email}
          onChange={onKeyChange("email")}
        />

        <CustomInput
          type="phone"
          title={i18n("phoneNumber")}
          placeholder={i18n("phoneNumber")}
          verified={user?.verified?.phone}
          profile={!!user}
          icc={context.phoneICC}
          nsn={context.phoneNSN}
          onICCChange={onKeyChange("phoneICC")}
          onNSNChange={onKeyChange("phoneNSN")}
        />

        <CustomInput
          type="text"
          title={i18n("role")}
          placeholder={i18n("role")}
          disabled
          value={user?.role ? i18n(user?.role) : ""}
          // Below line to avoid a bug
          // where all inputs that have
          // value prop should also have
          // an onChange handler.
          onChange={() => {}}
        />

        <CustomInput
          type="text"
          title={i18n("joinedBy")}
          placeholder={i18n("joinedBy")}
          disabled
          value={user ? i18n(user.authType) : ""}
          // Below line to avoid a bug
          // where all inputs that have
          // value prop should also have
          // an onChange handler.
          onChange={() => {}}
        />

        <CustomInput
          type="price"
          title={i18n("balance")}
          placeholder={i18n("balance")}
          disabled
          value={user?.balance?.toLocaleString() || 0}
          // Below line to avoid a bug
          // where all inputs that have
          // value prop should also have
          // an onChange handler.
          onChange={() => {}}
        />
      </InputsContainer>

      {!!context.error && <ErrorText lang={lang}>{context.error}</ErrorText>}

      <SubmitContainer lang={lang}>
        {context.submitting ? (
          <Loader />
        ) : (
          <CustomButton
            type="primary"
            title={context.changes.length ? i18n("save") : i18n("edit")}
            disabled={!context.changes.length}
            onClick={onEditProfile}
          />
        )}
      </SubmitContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  height: fit-content;
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 540px) {
    justify-content: center;
  }

  div,
  button {
    min-width: fit-content;
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

export default SecretaryUserSearchForm;
