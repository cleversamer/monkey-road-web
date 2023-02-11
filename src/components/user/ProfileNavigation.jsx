import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { FaRegUser, FaCarAlt } from "react-icons/fa";
import { HiOutlineKey, HiOutlineLogout } from "react-icons/hi";
import { MdCallReceived } from "react-icons/md";
import PopupConfirm from "hoc/PopupConfirm";
import { routes } from "client";
import useAuth from "auth/useAuth";
import useLocale from "hooks/useLocale";

const ProfileNavigation = ({ activeItem }) => {
  const { i18n, lang } = useLocale();
  const { user, logout } = useAuth();
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
        <Title>{i18n("myAccount")}</Title>

        <BreakLine />

        <NavItems lang={lang}>
          <NavItem active={activeItem === "personal info"}>
            <NavRoute to={routes.personalInfo.navigate()} lang={lang}>
              <FaRegUser />
              <NavItemTitle>{i18n("personalInfo")}</NavItemTitle>
            </NavRoute>
          </NavItem>

          <NavItem active={activeItem === "sales posts"}>
            <NavRoute to={routes.salesPosts.navigate()} lang={lang}>
              <FaCarAlt />
              <NavItemTitle>{i18n("salesPosts")}</NavItemTitle>
            </NavRoute>
          </NavItem>

          {user.role === "office" && (
            <NavItem active={activeItem === "rental posts"}>
              <NavRoute to={routes.rentalPosts.navigate()} lang={lang}>
                <FaCarAlt />
                <NavItemTitle>{i18n("rentalPosts")}</NavItemTitle>
              </NavRoute>
            </NavItem>
          )}

          {user.role === "office" && (
            <NavItem active={activeItem === "received orders"}>
              <NavRoute to={routes.myReceivedOrders.navigate()} lang={lang}>
                <MdCallReceived />
                <NavItemTitle>{i18n("receivedOrders")}</NavItemTitle>
              </NavRoute>
            </NavItem>
          )}

          <NavItem active={activeItem === "change password"}>
            <NavRoute to={routes.changePassword.navigate()} lang={lang}>
              <HiOutlineKey />
              <NavItemTitle>{i18n("changePassword")}</NavItemTitle>
            </NavRoute>
          </NavItem>

          <NavItem active={activeItem === "logout"}>
            <NavButton onClick={handleLogout} lang={lang}>
              <HiOutlineLogout />
              <NavItemTitle>{i18n("logoutTitle")}</NavItemTitle>
            </NavButton>
          </NavItem>
        </NavItems>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: max-content;
  max-width: 250px;
  height: fit-content;
  text-transform: capitalize;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;

  @media screen and (max-width: 540px) {
    max-width: 100%;
  }
`;

const Title = styled.h3`
  text-align: center;
  color: #fe7777;
  font-size: 22px;
  font-weight: 500;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
`;

const NavItem = styled.li`
  h4 {
    color: ${({ active }) => (active ? "#fe7777" : "#000")};
  }

  svg {
    transition-duration: 176ms;
    font-size: 15px;
    fill: ${({ active }) => (active ? "#fe7777" : "#000")};
  }

  :hover {
    h4 {
      color: #fe7777;
    }

    svg {
      fill: #fe7777;
    }
  }

  :active {
    transform: scale(0.97);
  }
`;

const NavItemTitle = styled.h4`
  font-weight: 600;
  font-size: 15px;
  transition-duration: 176ms;
`;

const NavRoute = styled(RouterLink)`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 7px;
  padding: 10px 0;
  transition-duration: 176ms;
  cursor: pointer;
`;

const NavButton = styled.span`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 7px;
  padding: 10px 0;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    h4 {
      color: #fe7777;
    }

    svg {
      fill: #fe7777;
    }
  }

  :active {
    transform: scale(0.99);
  }
`;

export default ProfileNavigation;
