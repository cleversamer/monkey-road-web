import { useState, useEffect } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import AdminSidebar from "v2/components/admin/sidebar";
import Loader from "v2/components/loader";
import EmptyList from "v2/components/common/empty-list";
import rentOrdersApi from "v2/api/car/rentOrders";
import Pagination from "v2/components/pagination";
import OfficeOrder from "v2/components/admin/office-order";
import FiltersSection from "v2/components/orders-table/FiltersSection";

const pageSize = 9;

const OfficesOrders = () => {
  const { lang } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState({
    all: [],
    view: [],
    loading: true,
    selectedStatus: "all",
    totalPages: 0,
  });

  useEffect(() => {
    rentOrdersApi.admin
      .getAllOrders(currentPage, pageSize)
      .then((res) => {
        const { orders, totalPages } = res.data;
        setOrders({
          ...orders,
          all: orders,
          view: orders,
          selectedStatus: "all",
          loading: false,
          totalPages,
        });
      })
      .catch(() =>
        setOrders({
          ...orders,
          all: [],
          view: [],
          loading: false,
          totalPages: 0,
        })
      );
  }, [currentPage]);

  const handleFilterItems = (title) => {
    const viewList =
      title === "all"
        ? [...orders.all]
        : orders.all.filter((order) => order.status === title);

    setOrders({ ...orders, selectedStatus: title, view: viewList });
  };

  const handleNextPage = () => {
    if (currentPage === orders.totalPages) return;
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
      <AdminSidebar />

      <Content>
        <FiltersSection orders={orders} onSelectItem={handleFilterItems} />
        <RentCarsContainer>
          {orders.loading ? (
            <Loader />
          ) : !orders.all.length ? (
            <EmptyList />
          ) : (
            orders.view.map((rentCar) => (
              <OfficeOrder key={rentCar._id} data={rentCar} />
            ))
          )}
        </RentCarsContainer>

        <Pagination
          currentPage={currentPage}
          totalPages={orders.totalPages}
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;

  @media screen and (max-width: 680px) {
    display: ${({ visible }) => (visible ? "grid" : "none")};
  }
`;

export default OfficesOrders;