import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import PurchaseCar from "components/car/purchase";
import Brand from "components/home/popular-brands/Brand";
import { routes } from "client";
import Loader from "components/loader";
import purchaseApi from "api/car/purchase";
import brandsApi from "api/car/brands";

const initialState = {
  loading: true,
  list: [],
};

const PurchaseCars = () => {
  const navigate = useNavigate();
  const [recentlyArrivedCars, setRecentlyArrivedCars] = useState(initialState);
  const [popularBrands, setPopularBrands] = useState(initialState);
  const [latestModelsCars, setLatestModelsCars] = useState(initialState);
  const [bestSellerCars, setBestSellerCars] = useState(initialState);

  useEffect(() => {
    // fetch recentlyArrivedCars
    purchaseApi.common
      .getRecentlyArrivedPurchaseCars(0)
      .then((res) =>
        setRecentlyArrivedCars({ list: res.data.cars, loading: false })
      )
      .catch((err) => setRecentlyArrivedCars({ list: [], loading: false }));

    // fetch popularBrands
    brandsApi.common
      .getPopularBrands(0)
      .then((res) => {
        setPopularBrands({ list: res.data.brands, loading: false });
      })
      .catch((err) => setPopularBrands({ list: [], loading: false }));

    // fetch latestModelsCars
    purchaseApi.common
      .getLatestModelsPurchaseCars(0)
      .then((res) =>
        setLatestModelsCars({ list: res.data.cars, loading: false })
      )
      .catch((err) => setLatestModelsCars({ list: [], loading: false }));

    // fetch bestSellerCars
    purchaseApi.common
      .getBestSellerPurchaseCars(0)
      .then((res) => setBestSellerCars({ list: res.data.cars, loading: false }))
      .catch((err) => setBestSellerCars({ list: [], loading: false }));
  }, []);

  return (
    <Container>
      <Location pageTitles={["Home", ">", "Cars for sale"]} />

      <SectionsContainer>
        <ItemsSection
          type="section"
          title="Recently arrived"
          onSeeMore={() =>
            navigate(routes.recentlyArrivedPurchaseCars.navigate())
          }
        >
          {recentlyArrivedCars.loading ? (
            <Loader />
          ) : (
            recentlyArrivedCars.list.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))
          )}
        </ItemsSection>

        <ItemsSection
          type="section"
          brands
          title="Popular brands"
          onSeeMore={() => navigate(routes.popularBrands.navigate())}
        >
          {popularBrands.loading ? (
            <Loader />
          ) : (
            popularBrands.list.map((brand) => (
              <Brand
                key={brand._id}
                title={brand.name.en}
                imageURL={brand.photoURL}
              />
            ))
          )}
        </ItemsSection>

        <ItemsSection
          type="section"
          title="Latest models"
          onSeeMore={() => navigate(routes.latestPurchaseCarModels.navigate())}
        >
          {latestModelsCars.loading ? (
            <Loader />
          ) : (
            latestModelsCars.list.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))
          )}
        </ItemsSection>

        <ItemsSection
          type="section"
          title="Best seller"
          onSeeMore={() => navigate(routes.bestPurchaseCarSellers.navigate())}
        >
          {bestSellerCars.loading ? (
            <Loader />
          ) : (
            bestSellerCars.list.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))
          )}
        </ItemsSection>
      </SectionsContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export default PurchaseCars;
