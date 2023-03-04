import { useState } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";

const AdminSendAlert = ({ title, onSendAlert }) => {
  const { i18n, lang } = useLocale();
  const [alert, setAlert] = useState({
    titleEN: "",
    bodyEN: "",
    titleAR: "",
    bodyAR: "",
  });

  const handleKeyChange = (key) => (e) =>
    setAlert({ ...alert, [key]: e.target.value });

  return (
    <FormContainer>
      <Title lang={lang}>{title}</Title>

      <BreakLine />

      <CustomInput
        type="text"
        title={i18n("alertTitle")}
        subtitle="English"
        value={alert.titleEN}
        onChange={handleKeyChange("titleEN")}
      />

      <CustomInput
        type="text"
        title={i18n("alertTitle")}
        subtitle="Arabic"
        value={alert.titleAR}
        onChange={handleKeyChange("titleAR")}
      />

      <CustomInput
        type="description"
        title={i18n("alertBody")}
        subtitle="English"
        value={alert.bodyEN}
        onChange={handleKeyChange("bodyEN")}
      />

      <CustomInput
        type="description"
        title={i18n("alertBody")}
        subtitle="Arabic"
        value={alert.bodyAR}
        onChange={handleKeyChange("bodyAR")}
      />

      {alert.bodyAR && alert.bodyEN && alert.titleAR && alert.titleEN && (
        <CustomButton
          type="primary"
          title={i18n("send")}
          onClick={() => onSendAlert(alert)}
        />
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  height: fit-content;

  button {
    min-width: 120px;
    width: fit-content;
    padding: 0 15px;
  }
`;

const Title = styled.h3`
  color: #fe7777;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

export default AdminSendAlert;
