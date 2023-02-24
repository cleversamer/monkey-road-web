import { useEffect, useState } from "react";
import styled from "styled-components";
import parseDate from "v2/utils/parseDate";
import useLocale from "v2/hooks/useLocale";

const Alert = ({ alert }) => {
  const { i18n, lang } = useLocale();
  const [time, setTime] = useState(parseDate(alert.date, lang));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(parseDate(alert.date, lang));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lang]);

  return (
    <Container lang={lang}>
      {!alert.seen && <NewAlertBadge lang={lang} />}

      <AlertImage
        src={alert.photoURL || "/assets/images/alert.svg"}
        alt="alert photo"
      />

      <Content lang={lang}>
        <AlertTitle primary={!alert.seen}>{alert.title[lang]}</AlertTitle>
        <AlertBody bold={!alert.seen}>{alert.body[lang]}</AlertBody>
        <AlertDate bold={!alert.seen}>
          {lang === "ar" && i18n("ago")} {time} {lang === "en" && i18n("ago")}
        </AlertDate>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 15px;
`;

const AlertImage = styled.img`
  width: 100px;
  object-fit: contain;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  gap: 12px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const AlertTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  color: ${({ primary }) => (primary ? "#fe7777" : "#000")};
`;

const AlertBody = styled.p`
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? "500" : "400")};
`;

const AlertDate = styled.div`
  font-size: 13px;
  font-weight: ${({ bold }) => (bold ? "500" : "400")};
`;

const NewAlertBadge = styled.span`
  position: absolute;
  top: 10px;
  ${({ lang }) => (lang === "en" ? "right: 10px;" : "left: 10px;")}
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fe7777;
`;

export default Alert;
