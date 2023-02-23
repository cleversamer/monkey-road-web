import styled from "styled-components";

const NavLogo = ({ onClick }) => {
  return (
    <Container onClick={onClick} src="/assets/images/nav-logo.svg" alt="logo" />
  );
};

const Container = styled.img`
  cursor: pointer;
  transition-duration: 176ms;

  :hover {
    transform: scale(0.97);
  }

  :active {
    transform: scale(0.95);
  }
`;

export default NavLogo;
