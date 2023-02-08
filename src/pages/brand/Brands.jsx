import { useState, useEffect } from "react";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import PurchaseCar from "components/car/purchase";
import Brand from "components/home/popular-brands/Brand";
import brandsApi from "api/car/brands";
import purchaseApi from "api/car/purchase";

const initialState = {
  list: [],
  loading: true,
};

const Brands = () => {
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
        pageTitles={["Home", ">", "Cars for sale", ">", "Popular brands"]}
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
          <ItemsSection type="slider" title="Latest cars for sale">
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
