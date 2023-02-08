import { useState } from "react";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ProfileNavigation from "components/user/ProfileNavigation";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import Loader from "components/loader";
import usersApi from "api/user/users";
import useAuth from "auth/useAuth";

const ChangePassword = () => {
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
      error = err?.response?.data?.message?.en || "Network error";
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
      <Location pageTitles={["home", ">", "profile", ">", "change password"]} />

      <Content>
        <ProfileNavigation activeItem="change password" />

        <FormContainer>
          <Title>change password</Title>

          <BreakLine />

          <InputsContainer>
            <CustomInput
              type="password"
              title="old password"
              subtitle="8-32 letters"
              value={context.oldPassword}
              onChange={handleKeyChange("oldPassword")}
            />

            <CustomInput
              type="password"
              title="new password"
              subtitle="8-32 letters"
              value={context.newPassword}
              onChange={handleKeyChange("newPassword")}
            />

            <CustomInput
              type="password"
              title="confirm password"
              subtitle="8-32 letters"
              value={context.confirmPassword}
              onChange={handleKeyChange("confirmPassword")}
            />

            {!!context.error && <ErrorText>{context.error}</ErrorText>}
          </InputsContainer>

          {context.submitting ? (
            <Loader />
          ) : (
            <CustomButton
              type="primary"
              title="change"
              onClick={handleChangePassword}
            />
          )}
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
`;

export default ChangePassword;
