import { useState } from "react";
import styled from "styled-components";
import { MdOutlineLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useLocale from "v1/hooks/useLocale";

const PasswordInput = (props) => {
  const { lang } = useLocale();
  const [visible, setVisible] = useState(false);

  const onToggleVisible = () => setVisible(!visible);

  return (
    <Container lang={lang}>
      <LeftIcon>
        <MdOutlineLock />
      </LeftIcon>

      <Input
        type={visible ? "text" : "password"}
        placeholder="********"
        autoComplete="true"
        lang={lang}
        {...props}
      />

      <RightIcon onClick={onToggleVisible} lang={lang}>
        {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
      </RightIcon>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding-left: ${({ lang }) => (lang === "en" ? "40px" : "10px")};
  padding-right: ${({ lang }) => (lang === "en" ? "10px" : "40px")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
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
  ${({ lang }) => (lang === "en" ? "right: 0;" : "left: 0;")}
  margin-top: 5px;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;

export default PasswordInput;
