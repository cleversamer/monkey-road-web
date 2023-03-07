import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SecretarySidebar from "v2/components/secretary/sidebar";
import useLocale from "v2/hooks/useLocale";
import SearchBox from "v2/components/common/search-box";
import usersApi from "v2/api/user/users";
import { routes } from "v2/client";
import SecretaryOfficeSearchForm from "v2/components/secretary/office-search-form";
import AdminSendAlert from "v2/components/admin/admin-send-alert";
import AdminOfficeOrders from "v2/components/admin/admin-office-orders";
import useAuth from "v2/auth/useAuth";

const SecretarySearchOffices = () => {
  const { socket } = useAuth();
  const navigate = useNavigate();
  const { i18n, lang } = useLocale();
  const { emailOrPhone } = useParams();
  const [office, setOffice] = useState({ data: null, loading: false });
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
      setOffice({ data: null, loading: false });
      return;
    }

    usersApi.admin
      .findOfficeByEmailOrPhone(emailOrPhone)
      .then((res) => {
        const office = res.data;
        setOffice({ data: office, loading: false });
        setContext({
          ...context,
          name: office.name,
          email: office.email,
          phoneICC: office.phone.icc,
          phoneNSN: office.phone.nsn,
          changes: [],
          error: "",
          submitting: false,
        });
      })
      .catch(() => {
        setOffice({ data: null, loading: false });
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
    navigate(routes.secretarySearchOffices.navigate(context.searchTerm));
  };

  const handleVerifyUser = async () => {
    try {
      if (!office) return;
      setContext({ ...context, submitting: true });
      const res = await usersApi.admin.verifyUser(emailOrPhone);
      const verifiedUser = res.data;
      setOffice({ data: verifiedUser, loading: false });
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

  const handleSendAlert = async (alert) => {
    try {
      const { titleEN, bodyEN, titleAR, bodyAR } = alert;
      if (!titleEN && !bodyEN && !titleAR && !bodyAR) return;

      const res = await usersApi.admin.sendNotificationToUsers(
        [office.data._id],
        titleEN,
        titleAR,
        bodyEN,
        bodyAR
      );
      socket.emit("send notification to user", office.data._id, res.data);
    } catch (err) {}
  };

  return (
    <Container lang={lang}>
      <SecretarySidebar activeItem="search offices" />

      <Content>
        <TopContainer lang={lang}>
          <PageTitle>{i18n("searchOffices")}</PageTitle>

          <SearchBox
            searchTerm={context.searchTerm}
            onSearchChange={handleKeyChange("searchTerm")}
            placeholder={i18n("searchOfficePlaceholder")}
            onSubmit={handleSearch}
          />
        </TopContainer>

        <SecretaryOfficeSearchForm
          context={context}
          user={office.data}
          onKeyChange={handleKeyChange}
          onVerifyUser={handleVerifyUser}
          onEditProfile={handleEditProfile}
        />

        {office.data && <AdminOfficeOrders officeId={office.data._id} />}

        {office.data && (
          <AdminSendAlert
            title={i18n("sendAlertToOffice")}
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

export default SecretarySearchOffices;
