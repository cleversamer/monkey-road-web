import styled from "styled-components";
import SecretarySidebar from "v2/components/secretary/sidebar";
import useLocale from "v2/hooks/useLocale";
import AdminSendAlert from "v2/components/admin/admin-send-alert";
import usersApi from "v2/api/user/users";
import useAuth from "v2/auth/useAuth";

const SecretarySendAlert = () => {
  const { i18n, lang } = useLocale();
  const { socket } = useAuth();

  const handleSendAlert = async (alert) => {
    try {
      const { titleEN, bodyEN, titleAR, bodyAR } = alert;
      if (!titleEN && !bodyEN && !titleAR && !bodyAR) return;

      const res = await usersApi.admin.sendNotificationToUsers(
        [],
        titleEN,
        titleAR,
        bodyEN,
        bodyAR
      );

      socket.emit("send notification", res.data);
    } catch (err) {}
  };

  return (
    <Container lang={lang}>
      <SecretarySidebar activeItem="alerts" />

      <Content>
        <PageTitle>{i18n("alerts")}</PageTitle>

        <AdminSendAlert
          title={i18n("sendAlertToAllUsers")}
          onSendAlert={handleSendAlert}
        />
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PageTitle = styled.h1`
  text-transform: capitalize;
  font-size: 26px;
  font-weight: 600;
  color: #fe7777;
`;

export default SecretarySendAlert;
