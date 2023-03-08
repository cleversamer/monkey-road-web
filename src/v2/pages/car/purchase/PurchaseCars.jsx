import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ItemsSection from "v2/components/common/items-section";
import PurchaseCar from "v2/components/car/purchase";
import Brand from "v2/components/home/popular-brands/Brand";
import { routes } from "v2/client";
import Loader from "v2/components/loader";
import purchaseApi from "v2/api/car/purchase";
import brandsApi from "v2/api/car/brands";
import useLocale from "v2/hooks/useLocale";

const initialState = {
  loading: true,
  list: [],
};

const PurchaseCars = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [recentlyArrivedCars, setRecentlyArrivedCars] = useState(initialState);
  const [popularBrands, setPopularBrands] = useState(initialState);
  const [latestModelsCars, setLatestModelsCars] = useState(initialState);
  const [bestSellerCars, setBestSellerCars] = useState(initialState);

  useEffect(() => {
    // fetch recentlyArrivedCars
    purchaseApi.common
      .getRecentlyArrivedPurchaseCars()
      .then((res) => {
        const { purchaseCars } = res.data;
        setRecentlyArrivedCars({ list: purchaseCars, loading: false });
      })
      .catch(() => setRecentlyArrivedCars({ list: [], loading: false }));

    // fetch popularBrands
    brandsApi.common
      .getPopularBrands(1, 8)
      .then((res) => {
        const { brands } = res.data;
        setPopularBrands({ list: brands, loading: false });
      })
      .catch(() => setPopularBrands({ list: [], loading: false }));

    // fetch latestModelsCars
    purchaseApi.common
      .getLatestModelsPurchaseCars()
      .then((res) => {
        const { purchaseCars } = res.data;
        setLatestModelsCars({ list: purchaseCars, loading: false });
      })
      .catch(() => setLatestModelsCars({ list: [], loading: false }));

    // fetch bestSellerCars
    purchaseApi.common
      .getBestSellerPurchaseCars()
      .then((res) => {
        const { purchaseCars } = res.data;
        setBestSellerCars({ list: purchaseCars, loading: false });
      })
      .catch(() => setBestSellerCars({ list: [], loading: false }));
  }, []);

  return (
    <Container>
      <Location
        pageTitles={[i18n("home"), i18n("arrow"), i18n("purchaseCars")]}
      />

      <SectionsContainer>
        <ItemsSection
          type="section"
          title={i18n("recentlyArrived")}
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
          title={i18n("popularBrands")}
          onSeeMore={() => navigate(routes.popularBrands.navigate())}
        >
          {popularBrands.loading ? (
            <Loader />
          ) : (
            popularBrands.list.map((brand) => (
              <Brand
                key={brand._id}
                title={brand.name}
                imageURL={brand.photoURL}
              />
            ))
          )}
        </ItemsSection>

        <ItemsSection
          type="section"
          title={i18n("latestModels")}
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
          title={i18n("bestSeller")}
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
  background-color: #fff;
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
