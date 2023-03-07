import { useState, useEffect } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import AdminSidebar from "v2/components/admin/sidebar";
import Loader from "v2/components/loader";
import EmptyList from "v2/components/common/empty-list";
import rentApi from "v2/api/car/rent";
import Pagination from "v2/components/pagination";
import AdminRentCar from "v2/components/admin-rent-car";

const pageSize = 9;

const AdminRentCars = () => {
  const { i18n, lang } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState({
    list: [],
    loading: true,
    totalPages: 0,
  });

  useEffect(() => {
    rentApi.common
      .getAllRentCars(currentPage, pageSize)
      .then((res) => {
        const { rentCars, totalPages } = res.data;
        setPosts({ ...posts, list: rentCars, loading: false, totalPages });
      })
      .catch(() =>
        setPosts({ ...posts, list: [], loading: false, totalPages: 0 })
      );
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage === posts.totalPages) return;
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
      <AdminSidebar activeItem="rent cars" />

      <Content>
        <PageTitle>{i18n("rentCars")}</PageTitle>

        <RentCarsContainer>
          {posts.loading ? (
            <Loader />
          ) : !posts.list.length ? (
            <EmptyList
              imageURL="/assets/images/empty-1.svg"
              title={i18n("noRentCars")}
            />
          ) : (
            posts.list.map((rentCar) => (
              <AdminRentCar key={rentCar._id} data={rentCar} />
            ))
          )}
        </RentCarsContainer>

        {!!posts.list.length && (
          <Pagination
            currentPage={currentPage}
            totalPages={posts.totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            onSelectPage={handleSelectPage}
          />
        )}
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;

  @media screen and (max-width: 680px) {
    display: ${({ visible }) => (visible ? "grid" : "none")};
  }
`;

const PageTitle = styled.h1`
  text-transform: capitalize;
  font-size: 26px;
  font-weight: 600;
  color: #fe7777;
`;

export default AdminRentCars;
