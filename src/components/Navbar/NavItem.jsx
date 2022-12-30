import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const NavItem = ({ title, activeItem, onNavigate, menu }) => {
  const isActive = activeItem === title && !menu ? "true" : "false";
  const isMenu = menu === "true";

  const handleClick = () => onNavigate(title);

  return (
    <Container active={isActive} onClick={handleClick}>
      <Content>
        <Link active={isActive}>{title}</Link>
        {isMenu ? <IoIosArrowDown size={20} /> : null}
      </Content>

      {isMenu && (
        <SubMenu>
          <SubMenuItem>Cars For Rent</SubMenuItem>
          <SubMenuItem>Cars For Sale</SubMenuItem>
        </SubMenu>
      )}
    </Container>
  );
};

const Container = styled.li`
  position: relative;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  :hover {
    > div {
      color: #fe7777 !important;

      svg {
        transform: translateY(2px);
      }
    }

    ul {
      display: block;
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 30px 15px;
  color: ${({ active }) => (active === "true" ? "#fe7777" : "#303030")};
`;

const Link = styled(RouterLink)`
  text-transform: capitalize;
  border-bottom: ${({ active }) =>
    active === "true" ? "2px solid #fe7777" : "none"};
  transition-duration: 176ms;
`;

const SubMenu = styled.ul`
  display: none;
  list-style: none;
  position: absolute;
  bottom: -60px;
  left: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
`;

const SubMenuItem = styled.li`
  padding: 10px 15px;
  width: 140px;
  box-sizing: content-box;
  font-size: 14px;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }
`;

export default NavItem;
