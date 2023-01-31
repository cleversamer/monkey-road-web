import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ProfileNavigation from "components/user/ProfileNavigation";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";
import { routes } from "client";

const PersonalInfo = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {};

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
            <LastLoginItem>{new Date().toLocaleString()}</LastLoginItem>
          </LastLoginContainer>

          <InputsContainer>
            <CustomInput
              type="name"
              title="Full Name"
              placeholder="Full Name"
            />

            <CustomInput
              type="email"
              title="Email"
              placeholder="Email"
              verified={false}
              onVerify={handleVerifyEmail}
              profile
            />

            <CustomInput
              type="phone"
              title="phone number"
              placeholder="phone number"
              verified={true}
              onVerify={handleVerifyPhone}
              profile
            />

            <CustomInput
              type="name"
              title="role"
              placeholder="role"
              disabled
              value="user"
            />
          </InputsContainer>

          <CustomButton
            type="primary"
            title="edit"
            onClick={handleEditProfile}
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
  width: 100%;
  background-color: #fff;
  padding: 20px;
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

export default PersonalInfo;
