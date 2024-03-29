import styled from "styled-components";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import useLocale from "v2/hooks/useLocale";

const PopupError = ({ onHide, message }) => {
  const { i18n } = useLocale();

  return (
    <PopupContainer onHide={onHide}>
      <Container>
        <TopRow>
          <IoClose onClick={onHide} />
          <Title>{i18n("error")}</Title>
        </TopRow>

        <Message>{message}</Message>

        <CTAContainer>
          <CancelButton onClick={onHide}>{i18n("cancel")}</CancelButton>
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
  text-align: center;
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

const Message = styled.h6`
  font-size: 14px;
`;

const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  border: none;
  outline: none;
  padding: 5px 10px;
  width: 120px;
  border-radius: 6px;
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.97);
  }
`;

const CancelButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #fe7777;
`;

export default PopupError;
