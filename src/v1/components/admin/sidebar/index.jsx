import { useState } from "react";
import styled from "styled-components";
import { GrHomeRounded, GrAppsRounded, GrLanguage } from "react-icons/gr";
import { FiUsers, FiFolder } from "react-icons/fi";
import { AiFillCar } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import useAuth from "v1/auth/useAuth";
import useLocale from "v1/hooks/useLocale";
import NavItem from "./NavItem";
import PopupConfirm from "v1/hoc/PopupConfirm";
import usersApi from "v1/api/user/users";

const AdminSidebar = () => {
  const { switchLang, i18n, lang } = useLocale();
  const { user, logout } = useAuth();
  const [excelUsers, setExcelUsers] = useState({ loading: false, url: "" });
  const [popupWindow, setPopupWindow] = useState({
    visible: false,
    handler: null,
  });

  const handleLogout = () => {
    if (popupWindow.visible) return;

    const logoutHander = () => {
      logout();

      setPopupWindow({
        visible: false,
        handler: null,
      });
    };

    setPopupWindow({ visible: true, handler: logoutHander });
  };

  const handleExportUsersToExcel = () => {
    setExcelUsers({ url: "", loading: true });

    usersApi.admin
      .exportUsersToExcel()
      .then((res) => {
        const url = res.data.path;
        setExcelUsers({ loading: false, url });
      })
      .catch((err) => setExcelUsers({ loading: false, url: "" }));
  };

  return (
    <>
      {popupWindow.visible && (
        <PopupConfirm
          title={i18n("logoutTitle")}
          subtitle={i18n("logoutSubtitle")}
          hint={i18n("logoutHint")}
          onHide={() => setPopupWindow(false)}
          onConfirm={popupWindow.handler}
        />
      )}

      <Container>
        {!!excelUsers.url && <IFrameDownload src={excelUsers.url} />}

        <Logo src="/assets/images/nav-logo.svg" alt="logo" />

        <AccountInfo lang={lang}>
          <AvatarContainer>
            <Avatar
              src="https://avatars.githubusercontent.com/u/73291969?v=4"
              alt={user.name}
            />
          </AvatarContainer>

          <NameContainer>
            <AdminTitle>{i18n("admin")}</AdminTitle>
            <Name>{user.name}</Name>
          </NameContainer>
        </AccountInfo>

        <NavItems>
          <NavItem title={i18n("mainScreen")} Icon={GrHomeRounded} />
          <NavItem
            title={i18n("pendingPosts")}
            Icon={GrAppsRounded}
            subItems={[{ title: i18n("rentalPosts"), onClick: () => {} }]}
          />
          <NavItem
            title={i18n("users")}
            Icon={FiUsers}
            subItems={[
              { title: i18n("searchUsers"), onClick: () => {} },
              {
                title: i18n("exportToExcel"),
                onClick: handleExportUsersToExcel,
                loading: excelUsers.loading,
              },
              { title: i18n("notifications"), onClick: () => {} },
            ]}
          />
          <NavItem
            title={i18n("brands")}
            Icon={FiFolder}
            subItems={[
              { title: i18n("viewBrands"), onClick: () => {} },
              { title: i18n("addBrand"), onClick: () => {} },
            ]}
          />
          <NavItem
            title={i18n("posts")}
            Icon={AiFillCar}
            subItems={[
              { title: i18n("rentCars"), onClick: () => {} },
              { title: i18n("purchaseCars"), onClick: () => {} },
            ]}
          />
          <NavItem
            title={i18n("language")}
            Icon={GrLanguage}
            onClick={switchLang}
          />
          <NavItem
            title={i18n("logout")}
            Icon={HiOutlineLogout}
            onClick={handleLogout}
          />
        </NavItems>
      </Container>
    </>
  );
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-transform: capitalize;
  background-color: #fff;
  width: fit-content;
  padding: 20px 60px;
  height: 100vh;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 7px;
`;

const Logo = styled.img`
  cursor: pointer;
  transition-duration: 176ms;
  margin-bottom: -20px;

  :hover {
    transform: scale(0.97);
  }

  :active {
    transform: scale(0.95);
  }
`;

const AvatarContainer = styled.div``;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    transform: scale(0.97);
  }

  :active {
    transform: scale(0.95);
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AdminTitle = styled.h3`
  font-size: 13px;
`;

const Name = styled.h4`
  font-size: 13px;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const IFrameDownload = styled.iframe`
  display: none;
  opacity: none;
`;

export default AdminSidebar;
