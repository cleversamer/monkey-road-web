import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { FaRegUser, FaCarAlt } from "react-icons/fa";
import { HiOutlineKey, HiOutlineLogout } from "react-icons/hi";
import { MdCallReceived } from "react-icons/md";
import { routes } from "client";

const ProfileNavigation = ({ activeItem }) => {
  return (
    <Container>
      <Title>my account</Title>

      <BreakLine />

      <NavItems>
        <NavItem active={activeItem === "personal info"}>
          <RouterLink to={routes.personalInfo.navigate()}>
            <FaRegUser />
            <NavItemTitle>personal info</NavItemTitle>
          </RouterLink>
        </NavItem>

        <NavItem active={activeItem === "sales posts"}>
          <RouterLink to={routes.salesPosts.navigate()}>
            <FaCarAlt />
            <NavItemTitle>sales posts</NavItemTitle>
          </RouterLink>
        </NavItem>

        <NavItem active={activeItem === "rental posts"}>
          <RouterLink to={routes.rentalPosts.navigate()}>
            <FaCarAlt />
            <NavItemTitle>rental posts</NavItemTitle>
          </RouterLink>
        </NavItem>

        <NavItem active={activeItem === "received orders"}>
          <RouterLink to={routes.rentalPosts.navigate()}>
            <MdCallReceived />
            <NavItemTitle>received orders</NavItemTitle>
          </RouterLink>
        </NavItem>

        <NavItem active={activeItem === "change password"}>
          <RouterLink to={routes.changePassword.navigate()}>
            <HiOutlineKey />
            <NavItemTitle>change password</NavItemTitle>
          </RouterLink>
        </NavItem>

        <NavItem active={activeItem === "logout"}>
          <RouterLink to={routes.home.navigate()}>
            <HiOutlineLogout />
            <NavItemTitle>logout</NavItemTitle>
          </RouterLink>
        </NavItem>
      </NavItems>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: max-content;
  max-width: 250px;
  text-transform: capitalize;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
`;

const Title = styled.h3`
  text-align: center;
  color: #fe7777;
  font-size: 22px;
  font-weight: 500;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 0;
    transition-duration: 176ms;
    cursor: pointer;
  }

  h4 {
    transition-duration: 176ms;
    color: ${({ active }) => (active ? "#fe7777" : "#000")};
  }

  svg {
    transition-duration: 176ms;
    font-size: 15px;
    fill: ${({ active }) => (active ? "#fe7777" : "#000")};
  }

  :hover {
    h4 {
      color: #fe7777;
    }

    svg {
      fill: #fe7777;
    }
  }

  :active {
    transform: scale(0.97);
  }
`;

const NavItemTitle = styled.h4`
  font-weight: 600;
  font-size: 15px;
`;

export default ProfileNavigation;
