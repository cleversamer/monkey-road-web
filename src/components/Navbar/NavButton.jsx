import styled from "styled-components";

const NavButton = ({ iconPath, title }) => {
  return (
    <Container>
      <NavButtonIcon src={iconPath} />
      <NavButtonTitle>{title}</NavButtonTitle>
    </Container>
  );
};

const Container = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition-duration: 176ms;

  :hover {
    transform: scale(1.05);

    img {
      transition-duration: 350ms;
      transform: rotate(360deg);
    }

    span {
      transition-duration: 350ms;
      color: #fe7777;
    }
  }

  :active {
    transform: scale(1);
  }
`;

const NavButtonIcon = styled.img`
  width: 16px;
`;

const NavButtonTitle = styled.span`
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 500;
`;

export default NavButton;
