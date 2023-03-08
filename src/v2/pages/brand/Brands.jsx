import { useState, useEffect } from "react";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import Brand from "v2/components/home/popular-brands/Brand";
import brandsApi from "v2/api/car/brands";
import useLocale from "v2/hooks/useLocale";
import Pagination from "v2/components/pagination";
import Loader from "v2/components/loader";

const pageSize = 28;

const Brands = () => {
  const { i18n } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState({
    list: [],
    loading: true,
    totalPages: 0,
  });

  useEffect(() => {
    brandsApi.common
      .getPopularBrands(currentPage, pageSize)
      .then((res) => {
        const { brands, totalPages } = res.data;
        setBrands({ list: brands, loading: false, totalPages });
      })
      .catch(() => setBrands({ list: [], loading: false }));
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage === brands.totalPages) return;
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
          {brands.loading ? (
            <Loader />
          ) : (
            brands.list.map((brand) => (
              <Brand
                key={brand._id}
                title={brand.name}
                imageURL={brand.photoURL}
              />
            ))
          )}
        </GridItems>
      </Content>

      <Pagination
        currentPage={currentPage}
        totalPages={brands.totalPages}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        onSelectPage={handleSelectPage}
      />
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  padding: 60px;
  background-color: #fff;
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
