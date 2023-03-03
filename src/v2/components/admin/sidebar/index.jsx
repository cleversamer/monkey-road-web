import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrHomeRounded, GrAppsRounded, GrLanguage } from "react-icons/gr";
import { FiUsers, FiFolder, FiDollarSign } from "react-icons/fi";
import { HiOutlineKey, HiOutlineLogout } from "react-icons/hi";
import useAuth from "v2/auth/useAuth";
import useLocale from "v2/hooks/useLocale";
import NavItem from "./NavItem";
import PopupConfirm from "v2/hoc/PopupConfirm";
import usersApi from "v2/api/user/users";
import { routes } from "v2/client";

const AdminSidebar = ({ activeItem }) => {
  const navigate = useNavigate();
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
      .catch(() => setExcelUsers({ loading: false, url: "" }));
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
          <NavItem
            title={i18n("home")}
            Icon={GrHomeRounded}
            onClick={() => navigate(routes.adminMain.navigate())}
            active={activeItem === "home"}
          />

          <NavItem
            title={i18n("posts")}
            Icon={GrAppsRounded}
            onClick={() => navigate(routes.pendingRentalPosts.navigate())}
            active={[
              "pending rental posts",
              "rent cars",
              "purchase cars",
              "offices orders",
            ].includes(activeItem)}
            subItems={[
              {
                title: i18n("pendingRentalPosts"),
                active: activeItem === "pending rental posts",
                onClick: () => navigate(routes.pendingRentalPosts.navigate()),
              },
              {
                title: i18n("rentCars"),
                active: activeItem === "rent cars",
                onClick: () => navigate(routes.allRentCars.navigate()),
              },
              {
                title: i18n("purchaseCars"),
                active: activeItem === "purchase cars",
                onClick: () => navigate(routes.allPurchaseCars.navigate()),
              },
              {
                title: i18n("officesOrders"),
                active: activeItem === "offices orders",
                onClick: () => navigate(routes.allOfficesOrders.navigate()),
              },
            ]}
          />

          <NavItem
            title={i18n("users")}
            Icon={FiUsers}
            subItems={[
              { title: i18n("searchUsers"), onClick: () => {} },
              { title: i18n("searchOffices"), onClick: () => {} },
              {
                title: i18n("exportToExcel"),
                onClick: handleExportUsersToExcel,
                loading: excelUsers.loading,
              },
              { title: i18n("alerts"), onClick: () => {} },
            ]}
          />

          <NavItem
            title={i18n("brands")}
            Icon={FiFolder}
            active={["brands", "add brand"].includes(activeItem)}
            onClick={() => navigate(routes.allBrands.navigate())}
            subItems={[
              {
                title: i18n("viewBrands"),
                active: activeItem === "brands",
                onClick: () => navigate(routes.allBrands.navigate()),
              },
              {
                title: i18n("addBrand"),
                onClick: () => navigate(routes.allBrands.navigate()),
              },
            ]}
          />

          <NavItem
            title={i18n("salesPostPrice")}
            Icon={FiDollarSign}
            subItems={[]}
          />

          <NavItem
            title={i18n("changePassword")}
            Icon={HiOutlineKey}
            subItems={[]}
            onClick={() => navigate(routes.changePassword.navigate())}
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
  min-width: max-content;
  padding: 20px 40px;
  height: fit-content;
  box-shadow: 1px 1px 3px 2px rgba(51, 51, 51, 0.2);
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 7px;
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
  gap: 20px;
`;

const IFrameDownload = styled.iframe`
  display: none;
  opacity: none;
`;

export default AdminSidebar;
