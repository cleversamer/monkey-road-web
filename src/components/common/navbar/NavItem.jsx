import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const NavItem = ({ title, activeItem, menu, onClick }) => {
  const handleClick = (title) => {
    if (!menu) {
      onClick(title);
    }
  };

  return (
    <Container active={activeItem === title} onClick={() => handleClick(title)}>
      <Content active={activeItem === title}>
        <Link active={activeItem === title ? "true" : "false"}>{title}</Link>
        {menu ? <IoIosArrowDown size={20} /> : null}
      </Content>

      {menu && (
        <SubMenu>
          <SubMenuItem
            active={activeItem === "rent"}
            onClick={() => handleClick("rent")}
          >
            Cars For Rent
          </SubMenuItem>

          <SubMenuItem
            active={activeItem === "sale"}
            onClick={() => handleClick("sale")}
          >
            Cars For Sale
          </SubMenuItem>
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
  color: ${({ active }) => (active ? "#fe7777" : "#000")};

  :hover {
    > div {
      transition-duration: 176ms;
      color: #fe7777;

      svg {
        transition-duration: 176ms;
        fill: #fe7777;
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
  height: 30px;
`;

const Link = styled(RouterLink)`
  text-transform: capitalize;
  border-bottom: ${({ active }) =>
    active === "true" ? "2px solid #fe7777" : "none"};
  line-height: 28px;
`;

const SubMenu = styled.ul`
  display: none;
  list-style: none;
  position: absolute;
  bottom: -70px;
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
  border-bottom: 1px solid #eee;

  :hover {
    color: #fe7777;
  }
`;

export default NavItem;
