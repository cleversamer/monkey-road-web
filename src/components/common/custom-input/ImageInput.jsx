import { useRef } from "react";
import styled from "styled-components";
import { AiFillFolder } from "react-icons/ai";

const ImageInput = ({ onChange }) => {
  const inputRef = useRef(null);

  return (
    <Container onClick={() => inputRef.current.click()}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onChange}
        multiple
      />

      <IconContainer>
        <AiFillFolder />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f4f4f4;
  border: 1.5px dashed #fe7777;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
`;

const IconContainer = styled.span`
  display: inline-block;
  background-color: #fe7777;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  svg {
    fill: #fff;
    font-size: 24px;
  }

  :hover {
    transform: scale(0.97);
  }
`;

export default ImageInput;
