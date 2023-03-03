import { useState } from "react";
import styled from "styled-components";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import useLocale from "v2/hooks/useLocale";
import Loader from "v2/components/loader";
import CustomInput from "v2/components/common/custom-input";

const PopupInput = ({ onHide, onSave, title, loading }) => {
  const { i18n } = useLocale();
  const [value, setValue] = useState("");

  return (
    <PopupContainer onHide={onHide}>
      <Container>
        <TopRow>
          <IoClose onClick={onHide} />
          {title && <Title>{title}</Title>}
        </TopRow>

        <CustomInput
          type="text"
          title={i18n("postPrice")}
          placeholder={i18n("postPrice")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {loading ? (
          <Loader />
        ) : (
          <CTAContainer>
            <SaveButton onClick={() => onSave(value)}>
              {i18n("save")}
            </SaveButton>
          </CTAContainer>
        )}
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

const SaveButton = styled(Button)`
  background-color: #fe7777;
  color: #fff;
`;

export default PopupInput;
