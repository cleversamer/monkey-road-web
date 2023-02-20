import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import RentCar from "components/car/rent";
import PurchaseCar from "components/car/purchase";
import EmptyList from "components/common/empty-list";
import { routes } from "client";
import usersApi from "api/user/users";
import rentApi from "api/car/rent";
import purchaseApi from "api/car/purchase";
import Loader from "components/loader";
import useLocale from "hooks/useLocale";
import useAuth from "auth/useAuth";

const MyFavorites = () => {
  const { user } = useAuth();
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({ loading: true, list: [] });
  const [latestCars, setLatestCars] = useState({ forRent: [], forSale: [] });

  useEffect(() => {
    // fetch latest rent cars
    rentApi.common
      .getAllRentCars()
      .then((res) => setLatestCars({ ...latestCars, forRent: res.data.cars }))
      .catch((err) => {});

    // fetch latest purchase cars
    purchaseApi.common
      .getRecentlyArrivedPurchaseCars()
      .then((res) => setLatestCars({ ...latestCars, forSale: res.data.cars }))
      .catch((err) => {});
  }, []);

  useEffect(() => {
    // fetch favorites
    usersApi.common
      .getMyFavorites()
      .then((res) => {
        setFavorites({ loading: false, list: res.data.favorites });
      })
      .catch((err) => {
        setFavorites({ loading: false, list: [] });
      });
  }, [user]);

  const handleGoShopping = () =>
    navigate(routes.latestPurchaseCarModels.navigate());

  return (
    <Container>
      <Location pageTitles={[i18n("home"), i18n("arrow"), i18n("favorites")]} />

      <FavoritesContainer>
        {!!favorites.list.length ? (
          <FavoritesList>
            {favorites.list.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))}
          </FavoritesList>
        ) : favorites.loading ? (
          <Loader />
        ) : (
          <EmptyList
            title={i18n("empty")}
            buttonTitle={i18n("goShopping")}
            imageURL="/assets/images/empty-1.svg"
            onClick={handleGoShopping}
          />
        )}
      </FavoritesContainer>

      <LatestCarsContainer>
        {!!latestCars.forRent.length && (
          <ItemsSection type="slider" title={i18n("latestRentalCars")}>
            {latestCars.forRent.map((car) => (
              <RentCar key={car._id} data={car} />
            ))}
          </ItemsSection>
        )}

        {!!latestCars.forSale.length && (
          <ItemsSection type="slider" title="latest cars for sale">
            {latestCars.forSale.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))}
          </ItemsSection>
        )}
      </LatestCarsContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;

  @media screen and (max-width: 768px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const FavoritesContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 80px;
`;

const FavoritesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-content: center;
  grid-gap: 20px;

  > * {
    margin: 0 auto;
  }
`;

const LatestCarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default MyFavorites;
