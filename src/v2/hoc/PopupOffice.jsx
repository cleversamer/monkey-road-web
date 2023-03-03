import styled from "styled-components";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import useLocale from "v2/hooks/useLocale";
import CustomButton from "v2/components/common/custom-button";

const PopupOffice = ({ office, onHide, onViewInSearch }) => {
  const { i18n } = useLocale();

  useEffect(() => {
    window.onkeydown = function (event) {
      if (event.keyCode == 27) {
        onHide();
      }
    };
  }, []);

  return (
    <PopupContainer onHide={onHide}>
      <Container>
        <TopRow>
          <IoClose onClick={onHide} />
          <Title>{i18n("receiverOffice")}</Title>
        </TopRow>

        <Content>
          <OfficeImage
            src={office.avatarURL || "/assets/images/default_avatar.svg"}
            alt={office.name}
          />

          <OfficeInfoContainer>
            <OfficeName>{office.name}</OfficeName>
            <OfficeEmail>{office.email}</OfficeEmail>
            <OfficePhone>{office.phone.full}</OfficePhone>
          </OfficeInfoContainer>
        </Content>

        <CTAContainer>
          <CustomButton
            type="primary"
            title={i18n("viewInSearch")}
            onClick={() => onViewInSearch(office._id)}
          />
        </CTAContainer>
      </Container>
    </PopupContainer>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 350px;
  height: fit-content;
  border-radius: 16px;
  padding: 30px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 176ms;
    font-size: 20px;
    cursor: pointer;

    :active {
      transform: scale(0.97);
    }
  }
`;

const Title = styled.h5`
  text-transform: capitalize;
  font-size: 16px;
`;

const Content = styled.div`
  display: flex;
  align-items: stretch;
  gap: 15px;
`;

const OfficeImage = styled.img`
  width: 50%;
  border-radius: 8px;
`;

const OfficeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OfficeName = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

const OfficeEmail = styled.h5`
  font-size: 13px;
  font-weight: 500;
`;

const OfficePhone = styled.h5`
  font-size: 13px;
  font-weight: 500;
`;

const CTAContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    font-size: 15px;
    font-weight: 600;
  }
`;

export default PopupOffice;
