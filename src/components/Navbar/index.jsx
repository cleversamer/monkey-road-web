import { useState } from "react";
import styled from "styled-components";
import NavLogo from "./NavLogo";
import NavItem from "./NavItem";
import NavButton from "./NavButton";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleNavigate = (title) => setActiveItem(title);

  return (
    <Container>
      <Content>
        <NavLogo />

        <NavItems>
          <NavItem
            title="Home"
            activeItem={activeItem}
            onNavigate={handleNavigate}
          />

          <NavItem
            title="View Cars"
            activeItem={activeItem}
            onNavigate={handleNavigate}
            menu="true"
          />

          <NavItem
            title="About Us"
            activeItem={activeItem}
            onNavigate={handleNavigate}
          />

          <NavItem
            title="Contact Us"
            activeItem={activeItem}
            onNavigate={handleNavigate}
          />
        </NavItems>

        <NavButtons>
          <NavButton title="Post" iconPath="/assets/icons/post.svg" />
          <NavButton title="Alerts" iconPath="/assets/icons/alert.svg" />
          <NavButton title="Orders" iconPath="/assets/icons/orders.svg" />
          <NavButton title="Favorites" iconPath="/assets/icons/favorite.svg" />
          <NavButton title="Login" iconPath="/assets/icons/user.svg" />
          <NavButton title="EN" iconPath="/assets/icons/language.svg" />
        </NavButtons>
      </Content>
    </Container>
  );
};

const Container = styled.nav`
  width: 100vw;
  position: sticky;
  top: 0;
  z-index: 999999;
  background-color: #fff;
  box-shadow: 0px 5px 4px rgba(51, 51, 51, 0.3);
`;

const Content = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
  margin: 0 auto;
`;

const NavItems = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const NavButtons = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
`;

export default Navbar;
