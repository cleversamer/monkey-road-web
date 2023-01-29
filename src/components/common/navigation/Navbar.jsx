import { useNavigate, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import NavLogo from "./NavLogo";
import NavButton from "./NavButton";
import { routes } from "client";

const Navbar = ({ onOpenMenu }) => {
  const navigate = useNavigate();

  const navigateAndScrollToTop = (route) => {
    navigate(route);
    scroll.scrollToTop();
  };

  const handleSwitchLanguage = () => {};

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo onClick={() => navigateAndScrollToTop(routes.home.route)} />

          <MobileIcon onClick={onOpenMenu}>
            <FaBars />
          </MobileIcon>

          <NavMenu>
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
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="app">
                <IoIosArrowDown /> View cars
              </NavLink>

              <SubMenu>
                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={routes.rentCars.navigate()}
                  >
                    Cars for rent
                  </NavRoute>
                </NavItem>

                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={routes.purchaseCars.navigate()}
                  >
                    Cars for sale
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
                Why us?
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
                About us
              </NavLink>
            </NavItem>
          </NavMenu>

          <DesktopNavButtons>
            <NavButton title="Post" iconPath="/assets/icons/post.svg" laptop>
              <NavItem>
                <NavRoute
                  onClick={() => scroll.scrollToTop()}
                  to={routes.addRentCar.navigate()}
                >
                  for rent
                </NavRoute>
              </NavItem>

              <NavItem>
                <NavRoute
                  onClick={() => scroll.scrollToTop()}
                  to={routes.addPurchaseCar.navigate()}
                >
                  for sale
                </NavRoute>
              </NavItem>
            </NavButton>

            <ButtonRouteContainer
              to={routes.addRentCar.navigate()}
              mobile="true"
              desktop="false"
            >
              <NavButton title="Post Rent" iconPath="/assets/icons/post.svg" />
            </ButtonRouteContainer>

            <ButtonRouteContainer
              to={routes.addPurchaseCar.navigate()}
              mobile="true"
              desktop="false"
            >
              <NavButton title="Post Sale" iconPath="/assets/icons/post.svg" />
            </ButtonRouteContainer>

            <ButtonRouteContainer
              to={routes.myOrders.navigate()}
              mobile="true"
              desktop="true"
            >
              <NavButton title="Orders" iconPath="/assets/icons/orders.svg" />
            </ButtonRouteContainer>

            <ButtonRouteContainer
              to={routes.myFavorites.navigate()}
              desktop="true"
              mobile="true"
            >
              <NavButton
                title="Favorites"
                iconPath="/assets/icons/favorite.svg"
              />
            </ButtonRouteContainer>

            <ButtonRouteContainer to="" desktop="true" mobile="true">
              <NavButton title="Alerts" iconPath="/assets/icons/alert.svg" />

              <NotificationsBadge>
                <NotificationsCount>9</NotificationsCount>
              </NotificationsBadge>
            </ButtonRouteContainer>

            <ButtonRouteContainer
              to={routes.login.navigate()}
              desktop="true"
              mobile="true"
            >
              <NavButton title="Login" iconPath="/assets/icons/user.svg" />
            </ButtonRouteContainer>

            <NavButton title="EN" iconPath="/assets/icons/language.svg" />
          </DesktopNavButtons>
        </NavbarContainer>
      </Nav>

      <MobileNavButtons>
        <NavButton title="Post" iconPath="/assets/icons/post.svg" laptop>
          <NavItem>
            <NavRoute
              onClick={() => scroll.scrollToTop()}
              to={routes.addRentCar.navigate()}
            >
              for rent
            </NavRoute>
          </NavItem>

          <NavItem>
            <NavRoute
              onClick={() => scroll.scrollToTop()}
              to={routes.addPurchaseCar.navigate()}
            >
              for sale
            </NavRoute>
          </NavItem>
        </NavButton>

        <ButtonRouteContainer
          to={routes.addRentCar.navigate()}
          mobile="true"
          desktop="false"
        >
          <NavButton title="Post Rent" iconPath="/assets/icons/post.svg" />
        </ButtonRouteContainer>

        <ButtonRouteContainer
          to={routes.addPurchaseCar.navigate()}
          mobile="true"
          desktop="false"
        >
          <NavButton title="Post Sale" iconPath="/assets/icons/post.svg" />
        </ButtonRouteContainer>

        <ButtonRouteContainer
          to={routes.myOrders.navigate()}
          mobile="true"
          desktop="true"
        >
          <NavButton title="Orders" iconPath="/assets/icons/orders.svg" />
        </ButtonRouteContainer>

        <ButtonRouteContainer
          to={routes.myFavorites.navigate()}
          desktop="true"
          mobile="true"
        >
          <NavButton title="Favorites" iconPath="/assets/icons/favorite.svg" />
        </ButtonRouteContainer>

        <ButtonRouteContainer to="" desktop="true" mobile="true">
          <NavButton title="Alerts" iconPath="/assets/icons/alert.svg" />

          <NotificationsBadge>
            <NotificationsCount>9</NotificationsCount>
          </NotificationsBadge>
        </ButtonRouteContainer>

        <ButtonRouteContainer
          to={routes.login.navigate()}
          desktop="true"
          mobile="true"
        >
          <NavButton title="Login" iconPath="/assets/icons/user.svg" />
        </ButtonRouteContainer>

        <NavButton title="EN" iconPath="/assets/icons/language.svg" />
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
  left: -50%;
  color: #010606;
  background-color: #fff;
  display: none;
  box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);

  ${NavItem} {
    height: fit-content;

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
    color: #fe7777;

    svg {
      color: #fe7777 !important;
      fill: #fe7777 !important;
      transition-duration: 176ms;
      transform: translateY(4px);
    }
  }
`;

const NavRoute = styled(RouterLink)`
  display: inline-block;
  width: 230px;
  font-size: 14px;
  padding: 7px 4px;
  border-bottom: 1px solid #eee;
  transition-duration: 200ms;
  text-transform: capitalize;

  &:hover {
    transition: 0.2s ease-out;
    color: #fe7777;
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

    /* height: fit-content;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fafafa;
    box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
    -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
    -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
    padding: 10px 20px;
    width: 100vw;
    overflow-x: auto; */
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
    padding-left: 70px;
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
