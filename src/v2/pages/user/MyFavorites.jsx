import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ItemsSection from "v2/components/common/items-section";
import RentCar from "v2/components/car/rent";
import PurchaseCar from "v2/components/car/purchase";
import EmptyList from "v2/components/common/empty-list";
import { routes } from "v2/client";
import usersApi from "v2/api/user/users";
import rentApi from "v2/api/car/rent";
import purchaseApi from "v2/api/car/purchase";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";
import useAuth from "v2/auth/useAuth";
import Pagination from "v2/components/pagination";

const pageSize = 12;

const MyFavorites = () => {
  const { user } = useAuth();
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState({
    loading: true,
    list: [],
    totalPages: 0,
  });
  const [latestCars, setLatestCars] = useState({ forRent: [], forSale: [] });

  useEffect(() => {
    // fetch latest rent cars
    rentApi.common
      .getAllRentCars(1, 10)
      .then((res) =>
        setLatestCars({ ...latestCars, forRent: res.data.rentCars })
      )
      .catch((err) => {});

    // fetch latest purchase cars
    purchaseApi.common
      .getRecentlyArrivedPurchaseCars(1, 10)
      .then((res) =>
        setLatestCars({ ...latestCars, forSale: res.data.purchaseCars })
      )
      .catch((err) => {});
  }, []);

  useEffect(() => {
    // fetch favorites
    usersApi.common
      .getMyFavorites(currentPage, pageSize)
      .then((res) => {
        const { purchaseCars, totalPages } = res.data;
        setFavorites({ loading: false, list: purchaseCars, totalPages });
      })
      .catch((err) =>
        setFavorites({ loading: false, list: [], totalPages: 0 })
      );
  }, [user, currentPage]);

  const handleGoShopping = () =>
    navigate(routes.latestPurchaseCarModels.navigate());

  const handleNextPage = () => {
    if (currentPage === favorites.totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleSelectPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

        {!!favorites.list.length && (
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              totalPages={favorites.totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onSelectPage={handleSelectPage}
            />
          </PaginationContainer>
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
  background-color: #fff;
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

const PaginationContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

export default MyFavorites;
