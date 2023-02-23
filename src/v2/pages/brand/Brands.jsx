import { useState, useEffect } from "react";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ItemsSection from "v2/components/common/items-section";
import PurchaseCar from "v2/components/car/purchase";
import Brand from "v2/components/home/popular-brands/Brand";
import brandsApi from "v2/api/car/brands";
import purchaseApi from "v2/api/car/purchase";
import useLocale from "v2/hooks/useLocale";

const initialState = {
  list: [],
  loading: true,
};

const Brands = () => {
  const { i18n } = useLocale();
  const [brands, setBrands] = useState(initialState);
  const [latestPurchaseCars, setLatestPurchaseCars] = useState(initialState);

  useEffect(() => {
    // fetch brands
    brandsApi.common
      .getPopularBrands(0)
      .then((res) => setBrands({ list: res.data.brands, loading: false }))
      .catch((err) => setBrands({ list: [], loading: false }));

    // fetch similar cars
    purchaseApi.common
      .getRecentlyArrivedPurchaseCars(0)
      .then((res) =>
        setLatestPurchaseCars({ list: res.data.cars, loading: false })
      )
      .catch((err) => setLatestPurchaseCars({ list: [], loading: false }));
  }, []);

  return (
    <Container>
      <Location
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("purchaseCars"),
          i18n("arrow"),
          i18n("popularBrands"),
        ]}
      />

      <Content>
        <GridItems>
          {brands.list.map((brand) => (
            <Brand
              key={brand._id}
              title={brand.name.en}
              imageURL={brand.photoURL}
            />
          ))}
        </GridItems>

        {!!latestPurchaseCars.list.length && (
          <ItemsSection type="slider" title={i18n("latestPurchaseCars")}>
            {latestPurchaseCars.list.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))}
          </ItemsSection>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  padding: 60px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 90px;
`;

const GridItems = styled.div`
  padding-right: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 20px;
`;

export default Brands;
