import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const NavItem = ({ title, activeItem, onNavigate }) => {
  return (
    <Container onClick={() => onNavigate(title)}>
      <Link active={activeItem === title ? "true" : "false"}>{title}</Link>
    </Container>
  );
};

const Container = styled.li`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
`;

const Link = styled(RouterLink)`
  text-transform: capitalize;
  color: ${({ active }) => (active === "true" ? "#fe7777" : "#000")};
  border-bottom: ${({ active }) =>
    active === "true" ? "2px solid #fe7777" : "none"};
`;

export default NavItem;
