import styled from "styled-components";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { routes } from "client";

const Sidebar = ({ isOpen, onCloseMenu }) => {
  const closeAndScrollToTop = () => {
    onCloseMenu();
    scroll.scrollToTop();
  };

  return (
    <Container isOpen={isOpen}>
      <Icon onClick={onCloseMenu}>
        <CloseIcon color="#243262" />
      </Icon>

      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="app" onClick={closeAndScrollToTop}>
            Home
          </SidebarLink>

          <SidebarRoute
            to={routes.rentCars.navigate()}
            onClick={closeAndScrollToTop}
          >
            Cars for rent
          </SidebarRoute>

          <SidebarRoute
            to={routes.purchaseCars.navigate()}
            onClick={closeAndScrollToTop}
          >
            Cars for sale
          </SidebarRoute>

          <SidebarLink to="why-us" onClick={onCloseMenu}>
            Why us?
          </SidebarLink>

          <SidebarLink to="about-us" onClick={onCloseMenu}>
            About us
          </SidebarLink>
        </SidebarMenu>

        <SidebarButton
          to={routes.login.navigate()}
          onClick={closeAndScrollToTop}
        >
          Login
        </SidebarButton>
      </SidebarWrapper>
    </Container>
  );
};

const Container = styled.aside`
  position: fixed;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: grid;
  align-items: center;
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
`;

const CloseIcon = styled(FaTimes)`
  fill: #fe7777;
`;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

const SidebarWrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

const SidebarLink = styled(ScrollLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #333;
  cursor: pointer;
  position: relative;
  text-transform: capitalize;

  &:hover {
    color: #fe7777;
    transition: 0.2s ease-in-out;
  }

  &:hover ul {
    display: block;
  }
`;

const SidebarRoute = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #333;
  cursor: pointer;
  position: relative;
  text-transform: capitalize;

  &:hover {
    color: #fe7777;
    transition: 0.2s ease-in-out;
  }

  &:hover ul {
    display: block;
  }
`;

const SidebarButton = styled(RouterLink)`
  background-color: #fe7777;
  text-align: center;
  display: inline-block;
  height: 35px;
  width: 40vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition-duration: 176ms;

  :active {
    transform: scale(0.97);
  }
`;

export default Sidebar;
