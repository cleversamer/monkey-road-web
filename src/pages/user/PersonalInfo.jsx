import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ProfileNavigation from "components/user/ProfileNavigation";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import Loader from "components/loader";
import { routes } from "client";
import useAuth from "auth/useAuth";
import parseDate from "utils/parseDate";
import usersApi from "api/user/users";

const PersonalInfo = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [lastLogin, setLastLogin] = useState(parseDate(user.lastLogin));
  const [context, setContext] = useState({
    lang: "en",
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
      setLastLogin(parseDate(user.lastLogin));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
      error = err?.response?.data?.message?.en || "Network error";
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
      <Location pageTitles={["home", ">", "profile", ">", "personal info"]} />

      <Content>
        <ProfileNavigation activeItem="personal info" />

        <FormContainer>
          <Title>personal info</Title>
          <BreakLine />

          <LastLoginContainer>
            <LastLoginItem>last login:</LastLoginItem>
            <LastLoginItem>{lastLogin} ago</LastLoginItem>
          </LastLoginContainer>

          <InputsContainer>
            <CustomInput
              type="name"
              title="Full Name"
              placeholder="Full Name"
              value={context.name}
              onChange={handleKeyChange("name")}
            />

            <CustomInput
              type="email"
              title="Email"
              placeholder="Email"
              verified={user.verified.email}
              onVerify={handleVerifyEmail}
              profile
              value={context.email}
              onChange={handleKeyChange("email")}
            />

            <CustomInput
              type="phone"
              title="phone number"
              placeholder="phone number"
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
              title="role"
              placeholder="role"
              disabled
              value={user.role}
            />

            {!!context.error && (
              <ErrorWrapper>
                <ErrorText>{context.error}</ErrorText>
              </ErrorWrapper>
            )}
          </InputsContainer>

          <SubmitContainer>
            {context.submitting ? (
              <Loader />
            ) : (
              <CustomButton
                type="primary"
                title={context.changes.length ? "save" : "edit"}
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
  @media screen and (max-width: 540px) {
    display: flex;
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
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

const LastLoginContainer = styled.div`
  display: flex;
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

export default PersonalInfo;
