import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import { routes } from "v2/client";
import screens from "v2/static/screens.json";
import useAuth from "v2/auth/useAuth";
import useDateTimer from "v2/hooks/useDateTimer";

const Alert = ({ alert }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { i18n, lang } = useLocale();
  const { value: time } = useDateTimer(alert?.date, [alert.date]);

  const handleClick = () => {
    try {
      const { screen, id } = alert.data;
      const screenKey = screens[screen][user.role];
      navigate(routes[screenKey].navigate(id));
    } catch (err) {}
  };

  return (
    <Container lang={lang} seen={alert.seen} onClick={handleClick}>
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
  box-shadow: ${({ seen }) =>
    seen
      ? "0px 1px 3px 2px rgba(51, 51, 51, 0.3)"
      : "0px 1px 3px 2px #fe777780"};
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 15px;
  cursor: pointer;

  @media screen and (max-width: 540px) {
    padding: 10px;
  }
`;

const AlertImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;

  @media screen and (max-width: 540px) {
    width: 80px;
  }

  @media screen and (max-width: 480px) {
    width: 70px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  gap: 12px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const AlertTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  width: calc(100% - 10px);
  color: ${({ primary }) => (primary ? "#fe7777" : "#000")};

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 540px) {
    font-size: 14px;
  }
`;

const AlertBody = styled.p`
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? "500" : "400")};

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  @media screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

const AlertDate = styled.div`
  font-size: 13px;
  font-weight: ${({ bold }) => (bold ? "500" : "400")};

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
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
