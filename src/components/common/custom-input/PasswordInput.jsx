import { useState } from "react";
import styled from "styled-components";
import { MdOutlineLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);

  const onToggleVisible = () => setVisible(!visible);

  return (
    <Container>
      <LeftIcon>
        <MdOutlineLock />
      </LeftIcon>

      <Input
        type={visible ? "text" : "password"}
        placeholder="********"
        {...props}
      />

      <RightIcon onClick={onToggleVisible}>
        {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
      </RightIcon>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding-left: 40px;
  padding-right: 10px;
  background-color: #f4f4f4;
`;

const LeftIcon = styled.span`
  position: absolute;
  margin-top: 5px;
  font-size: 20px;
  padding: 10px;
`;

const RightIcon = styled.span`
  position: absolute;
  right: 0;
  margin-top: 5px;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;

export default PasswordInput;
