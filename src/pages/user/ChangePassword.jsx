import { useState } from "react";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ProfileNavigation from "components/user/ProfileNavigation";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";

const ChangePassword = () => {
  const [context, setContext] = useState({ old: "", new: "", confirm: "" });

  const handleChangePassword = () => {};

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

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
              value={context.old}
              onChange={handleKeyChange("old")}
            />

            <CustomInput
              type="password"
              title="new password"
              value={context.new}
              onChange={handleKeyChange("new")}
            />

            <CustomInput
              type="password"
              title="confirm password"
              value={context.confirm}
              onChange={handleKeyChange("confirm")}
            />
          </InputsContainer>

          <CustomButton
            type="primary"
            title="change"
            onClick={handleChangePassword}
          />
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
  width: 400px;
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

export default ChangePassword;
