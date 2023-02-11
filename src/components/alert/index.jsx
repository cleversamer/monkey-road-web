import { useEffect, useState } from "react";
import styled from "styled-components";
import parseDate from "utils/parseDate";
import useLocale from "hooks/useLocale";

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
      <AlertTitle primary={!alert.seen}>{alert.title}</AlertTitle>
      <AlertBody bold={!alert.seen}>{alert.body}</AlertBody>
      <AlertDate bold={!alert.seen}>
        {lang === "ar" && i18n("ago")} {time} {lang === "en" && i18n("ago")}
      </AlertDate>
      {!alert.seen && <NewAlertBadge lang={lang} />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  gap: 12px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
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
