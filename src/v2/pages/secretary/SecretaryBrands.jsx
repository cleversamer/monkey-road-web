import { useState, useEffect } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import SecretarySidebar from "v2/components/secretary/sidebar";
import Loader from "v2/components/loader";
import EmptyList from "v2/components/common/empty-list";
import brandsApi from "v2/api/car/brands";
import Pagination from "v2/components/pagination";
import Brand from "v2/components/home/popular-brands/Brand";

const pageSize = 20;

const SecretaryBrands = () => {
  const { lang } = useLocale();
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
      .catch(() => setBrands({ list: [], loading: false, totalPages: 0 }));
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
    <Container lang={lang}>
      <SecretarySidebar activeItem="brands" />

      <Content>
        <RentCarsContainer>
          {brands.loading ? (
            <Loader />
          ) : !brands.list.length ? (
            <EmptyList />
          ) : (
            brands.list.map((brand) => (
              <Brand
                key={brand._id}
                title={brand.name[lang]}
                imageURL={brand.photoURL}
              />
            ))
          )}
        </RentCarsContainer>

        <Pagination
          currentPage={currentPage}
          totalPages={brands.totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          onSelectPage={handleSelectPage}
        />
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const RentCarsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 20px;
`;

export default SecretaryBrands;
