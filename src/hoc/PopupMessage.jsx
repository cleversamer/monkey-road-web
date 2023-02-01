import { useEffect } from "react";
import styled from "styled-components";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";

const PopupMessage = ({ onHide, imageURL, title, subtitle, children }) => {
  useEffect(() => {
    window.onkeydown = function (event) {
      if (event.keyCode == 27) {
        onHide();
      }
    };
  }, []);

  return (
    <PopupContainer>
      <Container>
        <TopRow>
          <Title>{title}</Title>
          <IoClose onClick={onHide} />
        </TopRow>

        <Image src={imageURL} alt="" />

        <SubTitle>{subtitle}</SubTitle>

        <CTAContainer>{children}</CTAContainer>
      </Container>
    </PopupContainer>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 350px;
  height: fit-content;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  padding-bottom: 15px;
`;

const TopRow = styled.div`
  background-color: #fe7777;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 10px;

  svg {
    position: absolute;
    top: 12px;
    right: 10px;
    transition-duration: 176ms;
    font-size: 15px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;

    :active {
      transform: scale(0.97);
    }
  }
`;

const Image = styled.img`
  width: 100px;
  margin: 30px 0;
`;

const Title = styled.h5`
  text-transform: capitalize;
  font-size: 16px;
  color: #fff;
`;

const SubTitle = styled.h6`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    width: 150px;
  }
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

const ConfirmButton = styled(Button)`
  background-color: #fe7777;
  color: #fff;
`;

export default PopupMessage;
