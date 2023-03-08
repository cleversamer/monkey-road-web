import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SecretarySidebar from "v2/components/secretary/sidebar";
import useLocale from "v2/hooks/useLocale";
import SearchBox from "v2/components/common/search-box";
import usersApi from "v2/api/user/users";
import { routes } from "v2/client";
import SecretaryUserSearchForm from "v2/components/secretary/user-search-form";
import AdminSendAlert from "v2/components/admin/admin-send-alert";
import useAuth from "v2/auth/useAuth";
import Loader from "v2/components/loader";

const SecretarySearchUsers = () => {
  const { socket } = useAuth();
  const navigate = useNavigate();
  const { i18n, lang } = useLocale();
  const { emailOrPhone } = useParams();
  const [user, setUser] = useState({ data: null, loading: true });
  const [context, setContext] = useState({
    lang: lang,
    searchTerm: emailOrPhone,
    name: "",
    email: "",
    phoneICC: "",
    phoneNSN: "",
    changes: [],
    error: "",
    submitting: false,
  });

  useEffect(() => {
    if (emailOrPhone === "*") {
      setContext({ ...context, searchTerm: "" });
      setUser({ data: null, loading: false });
      return;
    }

    setUser({ data: null, loading: true });

    usersApi.admin
      .findUserByEmailOrPhone(emailOrPhone)
      .then((res) => {
        const user = res.data;
        setUser({ data: user, loading: false });
        setContext({
          ...context,
          name: user.name,
          email: user.email,
          phoneICC: user.phone.icc,
          phoneNSN: user.phone.nsn,
          changes: [],
          error: "",
          submitting: false,
        });
      })
      .catch(() => {
        setUser({ data: null, loading: false });
        setContext({
          ...context,
          lang: lang,
          name: "",
          email: "",
          phoneICC: "",
          phoneNSN: "",
          changes: [],
          error: "",
          submitting: false,
        });
      });
  }, [emailOrPhone]);

  const handleKeyChange = (key) => (e) => {
    let newChanges = [...context.changes];
    if (!context.changes.includes(key)) {
      newChanges.push(key);
    }

    setContext({
      ...context,
      error: "",
      changes: newChanges,
      [key]: e.target.value,
    });
  };

  const handleEditProfile = async () => {
    let error = "";

    try {
      if (!context.changes.length) return;
      setContext({ ...context, submitting: true });

      const body = {
        ...context,
        emailOrPhone,
      };

      await usersApi.admin.updateUserProfile(body);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, changes: [], error });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!context.searchTerm) return;
    navigate(routes.secretarySearchUsers.navigate(context.searchTerm));
  };

  const handleVerifyUser = async () => {
    try {
      if (!user) return;
      setContext({ ...context, submitting: true });
      const res = await usersApi.admin.verifyUser(emailOrPhone);
      const verifiedUser = res.data;
      setUser({ data: verifiedUser, loading: false });
      setContext({
        ...context,
        name: verifiedUser.name,
        email: verifiedUser.email,
        phoneICC: verifiedUser.phone.icc,
        phoneNSN: verifiedUser.phone.nsn,
        changes: [],
        error: "",
        submitting: false,
      });
    } catch (err) {
      setContext({ ...context, submitting: false });
    }
  };

  const handleUpdateUserRole = async (role) => {
    try {
      if (!user) return;
      setContext({ ...context, submitting: true });
      const res = await usersApi.admin.updateUserRole(emailOrPhone, role);
      const verifiedUser = res.data;
      setUser({ data: verifiedUser, loading: false });
      setContext({ ...context, submitting: false });
    } catch (err) {
      setContext({ ...context, submitting: false });
    }
  };

  const handleSendAlert = async (alert) => {
    try {
      const { titleEN, bodyEN, titleAR, bodyAR } = alert;
      if (!titleEN && !bodyEN && !titleAR && !bodyAR) return;

      const res = await usersApi.admin.sendNotificationToUsers(
        [user.data._id],
        titleEN,
        titleAR,
        bodyEN,
        bodyAR
      );

      socket.emit("send notification to user", user.data._id, res.data);
    } catch (err) {}
  };

  return (
    <Container lang={lang}>
      <SecretarySidebar activeItem="search users" />

      <Content>
        <TopContainer lang={lang}>
          <PageTitle>{i18n("searchUsers")}</PageTitle>

          {user.loading ? (
            <Loader />
          ) : (
            <SearchBox
              searchTerm={context.searchTerm}
              onSearchChange={handleKeyChange("searchTerm")}
              placeholder={i18n("searchUserPlaceholder")}
              onSubmit={handleSearch}
            />
          )}
        </TopContainer>

        <SecretaryUserSearchForm
          context={context}
          user={user.data}
          onKeyChange={handleKeyChange}
          onUpdateUserRole={handleUpdateUserRole}
          onVerifyUser={handleVerifyUser}
          onEditProfile={handleEditProfile}
        />

        {user.data && (
          <AdminSendAlert
            title={i18n("sendAlertToUser")}
            onSendAlert={handleSendAlert}
          />
        )}
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

const TopContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  width: 100%;

  form {
    max-width: 500px;
  }
`;

const PageTitle = styled.h1`
  text-transform: capitalize;
  font-size: 26px;
  font-weight: 600;
  color: #fe7777;
`;

export default SecretarySearchUsers;
