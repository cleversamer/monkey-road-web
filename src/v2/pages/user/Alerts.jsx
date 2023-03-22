import { useState, useEffect } from "react";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ProfileNavigation from "v2/components/user/ProfileNavigation";
import Alert from "v2/components/alert";
import useAuth from "v2/auth/useAuth";
import usersApi from "v2/api/user/users";
import useLocale from "v2/hooks/useLocale";
import PopupConfirm from "v2/hoc/PopupConfirm";

const Alerts = () => {
  const { i18n, lang } = useLocale();
  const { user, setUser } = useAuth();
  const [popupClear, setPopupClear] = useState({
    visible: false,
    handler: null,
  });

  useEffect(() => {
    usersApi.common
      .seeNotifications()
      .then((res) =>
        setUser({ ...user, notifications: res.data.notifications })
      )
      .catch(() => {});
  }, []);

  const handleClearNotifications = () => {
    try {
      if (popupClear.visible) return;

      const handler = async () => {
        const res = await usersApi.common.clearNotifications();
        setUser({ ...user, notifications: res.data.notifications });
        setPopupClear({ handler: null, visible: false });
      };

      setPopupClear({ handler, visible: false });
    } catch (err) {}
  };

  return (
    <>
      {popupClear.handler && (
        <PopupConfirm
          title={i18n("clearNotificationsTitle")}
          subtitle={i18n("clearNotificationsSubtitle")}
          hint={i18n("clearNotificationsHint")}
          onConfirm={popupClear.handler}
          onHide={() => setPopupClear({ handler: null, visible: false })}
        />
      )}

      <Container>
        <Location pageTitles={[i18n("home"), i18n("arrow"), i18n("alerts")]} />

        <Content lang={lang}>
          <ProfileNavigation activeItem="" />

          {!user?.notifications?.length && (
            <EmptyAlerts>
              <EmptyAlertsImage src="/assets/images/empty-4.svg" alt="" />
              <EmptyAlertsTitle>{i18n("noAlerts")}</EmptyAlertsTitle>
              <EmptyAlertsSubtitle>{i18n("upToDate")}</EmptyAlertsSubtitle>
            </EmptyAlerts>
          )}

          {!!user?.notifications?.length && (
            <AlertsContainer lang={lang}>
              {!!user?.notifications?.length && (
                <ClearNotification
                  onClick={handleClearNotifications}
                  lang={lang}
                >
                  {i18n("clearNotifications")}
                </ClearNotification>
              )}

              <AlertsList lang={lang}>
                {user.notifications.map((alert, index) => (
                  <Alert key={index} alert={alert} />
                ))}
              </AlertsList>
            </AlertsContainer>
          )}
        </Content>
      </Container>
    </>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fff;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 30px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const EmptyAlerts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EmptyAlertsImage = styled.img`
  width: 180px;
`;

const EmptyAlertsTitle = styled.h4`
  text-transform: capitalize;
`;

const EmptyAlertsSubtitle = styled.h5`
  font-weight: 600;
`;

const AlertsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const ClearNotification = styled.div`
  position: absolute;
  top: -55px;
  right: 0;
  color: #fe7777;
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
  text-transform: capitalize;
  transition-duration: 176ms;
  cursor: pointer;
  width: 100%;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const AlertsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  gap: 20px;
`;

export default Alerts;
