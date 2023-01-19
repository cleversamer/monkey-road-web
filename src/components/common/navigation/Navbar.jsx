import { useNavigate, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { RxDoubleArrowDown } from "react-icons/rx";
import NavLogo from "./NavLogo";
import NavButton from "./NavButton";
import { ROUTES } from "client";

const Navbar = ({ onOpenMenu }) => {
  const navigate = useNavigate();

  const navigateAndScrollToTop = (route) => {
    navigate(route);
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo onClick={() => navigateAndScrollToTop(ROUTES.CLIENT.HOME)} />

          <MobileIcon onClick={onOpenMenu}>
            <FaBars />
          </MobileIcon>

          <NavMenu>
            <NavItem>
              <NavLink
                to="#"
                onClick={() => navigateAndScrollToTop(ROUTES.CLIENT.HOME)}
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
              <NavLink>
                <RxDoubleArrowDown /> View cars
              </NavLink>

              <SubMenu>
                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={ROUTES.CLIENT.RENT_CARS}
                  >
                    Cars for rent
                  </NavRoute>
                </NavItem>

                <NavItem>
                  <NavRoute
                    onClick={() => scroll.scrollToTop()}
                    to={ROUTES.CLIENT.PURCHASE_CARS}
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
                onClick={() => navigate(ROUTES.CLIENT.HOME)}
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
                onClick={() => navigate(ROUTES.CLIENT.HOME)}
              >
                About us
              </NavLink>
            </NavItem>
          </NavMenu>

          <NavButtons>
            <NavButton title="Post" iconPath="/assets/icons/post.svg" />
            <NavButton title="Alerts" iconPath="/assets/icons/alert.svg" />
            <NavButton title="Orders" iconPath="/assets/icons/orders.svg" />
            <NavButton
              title="Favorites"
              iconPath="/assets/icons/favorite.svg"
            />
            <NavButton title="Login" iconPath="/assets/icons/user.svg" />
            <NavButton title="EN" iconPath="/assets/icons/language.svg" />
          </NavButtons>
        </NavbarContainer>
      </Nav>
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
  flex-direction: column;
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
  gap: 7px;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  color: #010606;
  text-transform: capitalize;

  &:hover {
    transition: 0.2s ease-out;
    color: #e8591d;
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
    color: #e8591d;
  }
`;

const NavButtons = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;

  @media screen and (max-width: 1080px) {
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
    overflow-x: auto;
  }
`;

export default Navbar;
