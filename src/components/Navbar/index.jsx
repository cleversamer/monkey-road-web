import { useState } from "react";
import styled from "styled-components";
import NavLogo from "./NavLogo";
import NavItem from "./NavItem";
import NavButton from "./NavButton";

const navItems = ["Home", "View Cars", "About Us", "Contact Us"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => () => {
    setActiveItem(index);
  };

  return (
    <Container>
      <Content>
        <NavLogo />

        <NavItems>
          {navItems.map((title, index) => (
            <NavItem
              key={index}
              title={title}
              active={activeItem === index ? "true" : "false"}
              onClick={handleItemClick(index)}
            />
          ))}
        </NavItems>

        <NavButtons>
          <NavButton title="Post" iconPath="/assets/icons/post.svg" />
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
  box-shadow: 0px 5px 4px rgba(254, 119, 119, 0.3);
`;

const Content = styled.div`
  max-width: 1280px;
  background-color: #fff;
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
  gap: 35px;
`;

const NavButtons = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default Navbar;
