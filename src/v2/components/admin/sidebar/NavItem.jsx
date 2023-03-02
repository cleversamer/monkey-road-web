import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import Loader from "v2/components/loader";

const NavItem = ({ title, Icon, onClick, subItems = [] }) => {
  const { lang } = useLocale();

  return (
    <Container>
      <NavItemTitleContainer onClick={onClick} lang={lang}>
        <Icon />
        <NavItemTitle>{title}</NavItemTitle>
      </NavItemTitleContainer>

      {!!subItems.length && (
        <SubNavItems lang={lang}>
          {subItems.map(({ title, onClick, loading }, index) =>
            loading ? (
              <Loader key={index} />
            ) : (
              <SubNavItem key={title} onClick={onClick} lang={lang}>
                {title}
              </SubNavItem>
            )
          )}
        </SubNavItems>
      )}
    </Container>
  );
};

const Container = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItemTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  ${({ lang }) => (lang === "en" ? "" : "align-items: center;")}
  gap: 7px;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    &,
    *,
    + ul > li:first-child {
      transition-duration: 176ms;
      color: #fe7777;
      fill: #fe7777;
    }
  }

  :active {
    &,
    *,
    + ul > li:first-child {
      transform: scale(0.97);
    }
  }
`;

const NavItemTitle = styled.h5`
  font-size: 16px;
  font-weight: 600;
`;

const SubNavItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  list-style: none;
`;

const SubNavItem = styled.li`
  ${({ lang }) =>
    lang === "en" ? "margin-left: 30px;" : "margin-right: 30px;"}
  font-size: 14px;
  font-weight: 500;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    color: #fe7777;
  }

  :active {
    transform: scale(0.97);
  }
`;

export default NavItem;
