import styled from "styled-components";

const NavButton = ({ iconPath, title, laptop, children }) => {
  return (
    <Container laptop={laptop}>
      <Content>
        <NavButtonIcon src={iconPath} />
        <NavButtonTitle>{title}</NavButtonTitle>
      </Content>

      {children && <SubMenu>{children}</SubMenu>}
    </Container>
  );
};

const Container = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 176ms;
  position: relative;
  height: 100%;

  @media screen and (max-width: 1080px) {
    display: ${({ laptop }) => (laptop ? "none" : "block")};
  }

  :hover {
    transform: scale(1.05);

    ul {
      @media screen and (min-width: 1081px) {
        display: block;
      }
    }

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition-duration: 176ms;
`;

const NavButtonIcon = styled.img`
  width: 16px;
`;

const NavButtonTitle = styled.span`
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 500;
`;

const SubMenu = styled.ul`
  position: absolute;
  list-style: none;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  color: #010606;
  background-color: #fff;
  display: none;
  box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -webkit-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  -moz-box-shadow: 0px 0px 10px 3px rgba(254, 119, 119, 0.29);
  padding: 0;
  width: 130px;
  z-index: 500;

  li {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  @media screen and (max-width: 1080px) {
    top: -70px;
  }
`;

export default NavButton;
