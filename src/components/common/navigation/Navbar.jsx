import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser, FaCarAlt } from "react-icons/fa";
import { HiOutlineKey, HiOutlineLogout } from "react-icons/hi";
import { MdCallReceived } from "react-icons/md";
import NavLogo from "./NavLogo";
import NavButton from "./NavButton";
import { routes } from "client";
import PopupConfirm from "hoc/PopupConfirm";
import useAuth from "auth/useAuth";
import useLocale from "hooks/useLocale";

const Navbar = ({ onOpenMenu }) => {
  const { i18n, switchLang, lang } = useLocale();
  const { user, logout, socket, setUser } = useAuth();
  const navigate = useNavigate();
  const [popupWindow, setPopupWindow] = useState({
    visible: false,
    handler: null,
  });

  useEffect(() => {
    socket.on("notification received", (notification) => {
      console.log("notification", notification);
      setUser({
        ...user,
        notifications: [notification, ...user.notifications],
      });
    });
  }, [user]);

  const navigateAndScrollToTop = (route) => {
    navigate(route);
    scroll.scrollToTop();
  };

  const handleSwitchLanguage = () => {
    switchLang();
  };

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

  const getUnseenNotificationsLength = () =>
    user?.notifications?.filter((item) => !item.seen).length || 0;

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

      <Nav>
        <NavbarContainer>
          <NavLogo onClick={() => navigateAndScrollToTop(routes.home.route)} />

          <MobileIcon onClick={onOpenMenu}>
            <FaBars />
          </MobileIcon>

          <NavMenu lang={lang}>
            <NavItem>
              <NavLink
                to="app"
                onClick={() => navigateAndScrollToTop(routes.home.route)}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                {i18n("home")}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="app" lang={lang}>
                <span>{i18n("viewCars")}</span> <IoIosArrowDown />
              </NavLink>

              <SubMenu>
                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={routes.rentCars.navigate()}
                  >
                    {i18n("rentCars")}
                  </NavRoute>
                </NavItem>

                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={routes.purchaseCars.navigate()}
                  >
                    {i18n("purchaseCars")}
                  </NavRoute>
                </NavItem>
              </SubMenu>
            </NavItem>

            <NavItem>
              <NavLink
                to="why-us"
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                exact="true"
                onClick={() => navigate(routes.home.route)}
              >
                {i18n("whyUs")}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                to="about-us"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                onClick={() => navigate(routes.home.route)}
              >
                {i18n("aboutUs")}
              </NavLink>
            </NavItem>
          </NavMenu>

          <DesktopNavButtons>
            {user && (
              <NavButton
                title={i18n("post")}
                iconPath="/assets/icons/post.svg"
                laptop
              >
                {user.role === "office" && (
                  <NavItem>
                    <NavRoute
                      onClick={() => scroll.scrollToTop()}
                      to={routes.addRentCar.navigate()}
                    >
                      {i18n("forRent")}
                    </NavRoute>
                  </NavItem>
                )}

                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={routes.addPurchaseCar.navigate()}
                  >
                    {i18n("forSale")}
                  </NavRoute>
                </NavItem>
              </NavButton>
            )}

            {user && user.role === "office" && (
              <ButtonRouteContainer
                to={routes.addRentCar.navigate()}
                mobile="true"
                desktop="false"
              >
                <NavButton
                  title={i18n("postRent")}
                  iconPath="/assets/icons/post.svg"
                />
              </ButtonRouteContainer>
            )}

            {user && (
              <ButtonRouteContainer
                to={routes.addPurchaseCar.navigate()}
                mobile="true"
                desktop="false"
              >
                <NavButton
                  title={i18n("postSale")}
                  iconPath="/assets/icons/post.svg"
                />
              </ButtonRouteContainer>
            )}

            {user && (
              <ButtonRouteContainer
                to={routes.myOrders.navigate()}
                mobile="true"
                desktop="true"
              >
                <NavButton
                  title={i18n("orders")}
                  iconPath="/assets/icons/orders.svg"
                />
              </ButtonRouteContainer>
            )}

            {user && (
              <ButtonRouteContainer
                to={routes.myFavorites.navigate()}
                desktop="true"
                mobile="true"
              >
                <NavButton
                  title={i18n("favorites")}
                  iconPath="/assets/icons/favorite.svg"
                />
              </ButtonRouteContainer>
            )}

            {user && (
              <ButtonRouteContainer
                to={routes.alerts.navigate()}
                desktop="true"
                mobile="true"
              >
                <NavButton
                  title={i18n("alerts")}
                  iconPath="/assets/icons/alert.svg"
                />

                <NotificationsBadge>
                  <NotificationsCount>
                    {getUnseenNotificationsLength()}
                  </NotificationsCount>
                </NotificationsBadge>
              </ButtonRouteContainer>
            )}

            {!user && (
              <ButtonRouteContainer
                to={routes.login.navigate()}
                desktop="true"
                mobile="true"
              >
                <NavButton
                  title={i18n("login")}
                  iconPath="/assets/icons/user.svg"
                />
              </ButtonRouteContainer>
            )}

            {user && (
              <NavButton
                title={i18n("profile")}
                iconPath="/assets/icons/user.svg"
              >
                <NavItem>
                  <NavRoute
                    lang={lang}
                    onClick={() => scroll.scrollToTop()}
                    to={routes.personalInfo.navigate()}
                  >
                    <FaRegUser /> {i18n("personalInfo")}
                  </NavRoute>
                </NavItem>

                <NavItem>
                  <NavRoute
                    lang={lang}
                    onClick={() => scroll.scrollToTop()}
                    to={routes.salesPosts.navigate()}
                  >
                    <FaCarAlt /> {i18n("salesPosts")}
                  </NavRoute>
                </NavItem>

                {user && user.role === "office" && (
                  <NavItem>
                    <NavRoute
                      lang={lang}
                      onClick={() => scroll.scrollToTop()}
                      to={routes.rentalPosts.navigate()}
                    >
                      <FaCarAlt /> {i18n("rentalPosts")}
                    </NavRoute>
                  </NavItem>
                )}

                {user && user.role === "office" && (
                  <NavItem>
                    <NavRoute
                      lang={lang}
                      onClick={() => scroll.scrollToTop()}
                      to={routes.myReceivedOrders.navigate()}
                    >
                      <MdCallReceived /> {i18n("receivedOrders")}
                    </NavRoute>
                  </NavItem>
                )}

                <NavItem>
                  <NavRoute
                    lang={lang}
                    onClick={() => scroll.scrollToTop()}
                    to={routes.changePassword.navigate()}
                  >
                    <HiOutlineKey /> {i18n("changePassword")}
                  </NavRoute>
                </NavItem>

                <NavItem>
                  <NavRoute lang={lang} onClick={handleLogout} to="#">
                    <HiOutlineLogout /> {i18n("logoutTitle")}
                  </NavRoute>
                </NavItem>
              </NavButton>
            )}

            <NavButton
              title={lang.toUpperCase()}
              iconPath="/assets/icons/language.svg"
              onClick={handleSwitchLanguage}
            />
          </DesktopNavButtons>
        </NavbarContainer>
      </Nav>

      <MobileNavButtons user={user}>
        {user && (
          <NavButton
            title={i18n("post")}
            iconPath="/assets/icons/post.svg"
            laptop
          >
            {user.role === "office" && (
              <NavItem>
                <NavRoute
                  onClick={() => scroll.scrollToTop()}
                  to={routes.addRentCar.navigate()}
                >
                  {i18n("forRent")}
                </NavRoute>
              </NavItem>
            )}

            <NavItem>
              <NavRoute
                onClick={() => scroll.scrollToTop()}
                to={routes.addPurchaseCar.navigate()}
              >
                {i18n("forSale")}
              </NavRoute>
            </NavItem>
          </NavButton>
        )}

        {user && user.role === "office" && (
          <ButtonRouteContainer
            to={routes.addRentCar.navigate()}
            mobile="true"
            desktop="false"
          >
            <NavButton
              title={i18n("postRent")}
              iconPath="/assets/icons/post.svg"
            />
          </ButtonRouteContainer>
        )}

        {user && (
          <ButtonRouteContainer
            to={routes.addPurchaseCar.navigate()}
            mobile="true"
            desktop="false"
          >
            <NavButton
              title={i18n("postSale")}
              iconPath="/assets/icons/post.svg"
            />
          </ButtonRouteContainer>
        )}

        {user && (
          <ButtonRouteContainer
            to={routes.myOrders.navigate()}
            mobile="true"
            desktop="true"
          >
            <NavButton
              title={i18n("orders")}
              iconPath="/assets/icons/orders.svg"
            />
          </ButtonRouteContainer>
        )}

        {user && (
          <ButtonRouteContainer
            to={routes.myFavorites.navigate()}
            desktop="true"
            mobile="true"
          >
            <NavButton
              title={i18n("favorites")}
              iconPath="/assets/icons/favorite.svg"
            />
          </ButtonRouteContainer>
        )}

        {user && (
          <ButtonRouteContainer
            to={routes.alerts.navigate()}
            desktop="true"
            mobile="true"
          >
            <NavButton
              title={i18n("alerts")}
              iconPath="/assets/icons/alert.svg"
            />

            <NotificationsBadge>
              <NotificationsCount>
                {getUnseenNotificationsLength()}
              </NotificationsCount>
            </NotificationsBadge>
          </ButtonRouteContainer>
        )}

        {!user && (
          <ButtonRouteContainer
            to={routes.login.navigate()}
            desktop="true"
            mobile="true"
          >
            <NavButton
              title={i18n("login")}
              iconPath="/assets/icons/user.svg"
            />
          </ButtonRouteContainer>
        )}

        {user && (
          <ButtonRouteContainer
            to={routes.personalInfo.navigate()}
            desktop="false"
            mobile="true"
          >
            <NavButton
              title={i18n("profile")}
              iconPath="/assets/icons/user.svg"
            />
          </ButtonRouteContainer>
        )}

        <NavButton
          title={lang.toUpperCase()}
          iconPath="/assets/icons/language.svg"
          onClick={handleSwitchLanguage}
        />
      </MobileNavButtons>
    </>
  );
};

const Nav = styled.nav`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  position: sticky;
  top: 0;
  z-index: 999999;
  background: #fafafa;
  box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100vw;
  max-width: 1366px;
  padding: 0 40px;
  padding-left: 15px;

  @media screen and (max-width: 480px) {
    padding-left: 0;
  }
`;

const MobileIcon = styled.div`
  display: none;
  svg {
    fill: #fe7777;
  }

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 80px;
  position: relative;

  &:hover ul {
    display: block;
  }
`;

const SubMenu = styled(NavMenu)`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: #010606;
  background-color: #fff;
  display: none;
  box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);

  ${NavItem} {
    height: fit-content;
    width: 150px;

    > * {
      font-size: 15px;
      font-weight: 500;
    }
  }
`;

const NavLink = styled(ScrollLink)`
  font-size: 17px;
  font-weight: 500;
  color: inherit;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 5px;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  color: #010606;
  text-transform: capitalize;

  svg {
    font-size: 20px;
  }

  :hover {
    transition: 0.2s ease-out;

    &,
    * {
      color: #fe7777;
    }

    svg {
      color: #fe7777 !important;
      fill: #fe7777 !important;
      transition-duration: 176ms;
      transform: translateY(4px);
    }
  }
`;

const NavRoute = styled(RouterLink)`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  min-width: max-content;
  font-size: 14px;
  font-weight: 500;
  padding: 7px 10px;
  border-bottom: 1px solid #eee;
  transition-duration: 200ms;
  text-transform: capitalize;

  svg {
    font-size: 16px;
  }

  &:hover {
    transition: 0.2s ease-out;
    color: #fe7777;

    svg {
      transition: 0.2s ease-out;
      fill: #fe7777;
    }
  }
`;

const DesktopNavButtons = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;

  @media screen and (max-width: 1080px) {
    display: none;
  }
`;

const MobileNavButtons = styled.ul`
  display: none;
  list-style: none;
  justify-content: center;
  align-items: center;
  gap: 20px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  width: 100vw;
  z-index: 999999;
  background: #fafafa;
  box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  overflow-x: auto;

  @media screen and (max-width: 1080px) {
    display: flex;
  }

  @media screen and (max-width: 460px) {
    ${({ user }) => (user ? "padding-left: 70px;" : "")}
  }

  @media screen and (max-width: 380px) {
    padding-left: 100px;
  }

  @media screen and (max-width: 360px) {
    padding-left: 130px;
  }

  @media screen and (max-width: 340px) {
    padding-left: 150px;
  }
`;

const NotificationsBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -7px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #f00;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationsCount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #fff;
`;

const ButtonRouteContainer = styled(RouterLink)`
  min-width: max-content;
  position: relative;
  display: ${({ desktop, mobile }) =>
    desktop === "true" ? "block" : mobile === "true" ? "none" : "block"};

  @media screen and (max-width: 1080px) {
    display: ${({ mobile, desktop }) =>
      mobile === "true" ? "block" : desktop === "true" ? "none" : "block"};
  }
`;

export default Navbar;
