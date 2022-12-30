import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const NavItem = ({ title, active, ...props }) => {
  return (
    <Container {...props}>
      <Link active={active}>{title}</Link>
    </Container>
  );
};

const Container = styled.li`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
`;

const Link = styled(RouterLink)`
  color: ${({ active }) => (active === "true" ? "#fe7777" : "#000")};
  border-bottom: ${({ active }) =>
    active === "true" ? "2px solid #fe7777" : "none"};
  transition-delay: 100ms;
  transition-duration: 130ms;
`;

export default NavItem;
