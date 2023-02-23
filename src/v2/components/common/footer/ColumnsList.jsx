import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";

const ColumnsList = () => {
  const { i18n } = useLocale();

  return (
    <Container>
      <ColumnItem>
        <ColumnTitle>{i18n("website")}</ColumnTitle>

        <ColumnRoute
          to={routes.home.navigate()}
          onClick={() => scroll.scrollToTop()}
        >
          {i18n("home")}
        </ColumnRoute>

        <ColumnRoute to={routes.rentCars.navigate()}>
          {i18n("rentCars")}
        </ColumnRoute>

        <ColumnRoute to={routes.purchaseCars.navigate()}>
          {i18n("purchaseCars")}
        </ColumnRoute>
      </ColumnItem>

      <ColumnItem>
        <ColumnTitle>{i18n("aboutUs")}</ColumnTitle>

        <ColumnScrollLink
          to="about-us"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          {i18n("aboutUs")}
        </ColumnScrollLink>

        <ColumnRoute to={routes.home.navigate()}>{i18n("faq")}</ColumnRoute>

        <ColumnRoute to={routes.home.navigate()}>
          {i18n("privacyPolicy")}
        </ColumnRoute>

        <ColumnRoute to={routes.home.navigate()}>{i18n("terms")}</ColumnRoute>
      </ColumnItem>

      <ColumnItem>
        <ColumnTitle>{i18n("app")}</ColumnTitle>

        <ColumnLink target="_blank" href="https://play.google.com">
          <StoreImage
            src="/assets/icons/footer/app-store.svg"
            alt="app store"
          />
        </ColumnLink>

        <ColumnLink target="_blank" href="https://play.google.com">
          <StoreImage
            src="/assets/icons/footer/play-store.svg"
            alt="play store"
          />
        </ColumnLink>
      </ColumnItem>
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1280px) {
    order: 1;
    width: 100%;
    max-width: 600px;
  }

  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-row-gap: 30px;
  }
`;

const ColumnItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  width: 250px;

  @media screen and (max-width: 1280px) {
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
`;

const ColumnTitle = styled.h6`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const ColumnRoute = styled(RouterLink)`
  font-size: 15px;
  width: fit-content;
  text-transform: capitalize;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }
`;

const ColumnScrollLink = styled(ScrollLink)`
  font-size: 15px;
  width: fit-content;
  text-transform: capitalize;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }
`;

const ColumnLink = styled.a`
  font-size: 15px;
  width: fit-content;
  text-transform: capitalize;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }
`;

const StoreImage = styled.img`
  width: 100px;
`;

export default ColumnsList;
