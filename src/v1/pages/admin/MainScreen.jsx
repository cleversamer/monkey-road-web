import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminSidebar from "v1/components/admin/sidebar";
import CustomButton from "v1/components/common/custom-button";
import { AiFillCar } from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";
import ItemsSection from "v1/components/common/items-section";
import useLocale from "v1/hooks/useLocale";
import Card from "v1/components/admin/card";
import PendingRentCar from "v1/components/car/pending-rental";
import AdminRentCar from "v1/components/admin-rent-car";
import PurchaseCar from "v1/components/car/purchase";
import Loader from "v1/components/loader";
import usersApi from "v1/api/user/users";
import rentApi from "v1/api/car/rent";
import rentOrders from "v1/api/car/rentOrders";
import purchaseApi from "v1/api/car/purchase";

const MainScreen = () => {
  const { i18n, lang } = useLocale();
  const [status, setStatus] = useState({ loading: true, value: {} });
  const [rentCars, setRentCars] = useState({ list: [], loading: true });
  const [purcahseCars, setPurchaseCars] = useState({ list: [], loading: true });
  const [officeOrders, setOfficeOrders] = useState({ list: [], loading: true });
  const [pendingRentalPosts, setPendingRentalPosts] = useState({
    list: [],
    loading: true,
  });

  const handleAddBrand = () => {};

  useEffect(() => {
    usersApi.admin
      .getCarsStatus()
      .then((res) => setStatus({ loading: false, value: res.data }))
      .catch((err) => setStatus({ loading: false, value: {} }));

    rentApi.admin
      .getNotAcceptedRentCars(0)
      .then((res) => {
        const cars = [];
        for (let i = 0; i < res.data.cars.length && i < 3; i++) {
          cars.unshift(res.data.cars[i]);
        }
        setPendingRentalPosts({ loading: false, list: cars });
      })
      .catch((err) => setPendingRentalPosts({ loading: false, list: [] }));

    rentApi.common
      .getAllRentCars(0)
      .then((res) => {
        const cars = [];
        for (let i = 0; i < res.data.cars.length && i < 3; i++) {
          cars.unshift(res.data.cars[i]);
        }
        setRentCars({ loading: false, list: cars });
      })
      .catch((err) => setRentCars({ loading: false, list: [] }));

    purchaseApi.common
      .getRecentlyArrivedPurchaseCars(0)
      .then((res) => {
        const cars = [];
        for (let i = 0; i < res.data.cars.length && i < 3; i++) {
          cars.unshift(res.data.cars[i]);
        }
        setPurchaseCars({ loading: false, list: cars });
      })
      .catch((err) => setPurchaseCars({ loading: false, list: [] }));

    rentOrders.admin
      .getAllOrders(0)
      .then((res) => {
        const orders = [];
        for (let i = 0; i < res.data.orders.length && i < 3; i++) {
          orders.unshift(res.data.orders[i]);
        }
        setOfficeOrders({ loading: false, list: orders });
      })
      .catch((err) => setOfficeOrders({ loading: false, list: [] }));
  }, []);

  const handleSeeMoreRentCars = () => {
    //
  };

  const handleSeeMorePurcahseCars = () => {
    //
  };

  const handleSeeMorePendingRentalPosts = () => {
    //
  };

  const handleSeeMoreOfficeOrders = () => {
    //
  };

  return (
    <Container lang={lang}>
      <AdminSidebar />

      <Content>
        <TopContainer lang={lang}>
          <PageTitle>{i18n("mainScreen")}</PageTitle>

          <CustomButton
            type="primary"
            title={i18n("addBrandButton")}
            onClick={handleAddBrand}
          />
        </TopContainer>

        <CardsContainer lang={lang}>
          {status.loading ? (
            <Loader />
          ) : (
            <Card
              title={i18n("rentCars")}
              value={status?.value?.rent?.total || 0}
              Icon={AiFillCar}
            />
          )}

          {status.loading ? (
            <Loader />
          ) : (
            <Card
              title={i18n("purchaseCars")}
              value={status?.value?.purchase?.total || 0}
              Icon={AiFillCar}
            />
          )}

          {status.loading ? (
            <Loader />
          ) : (
            <Card
              title={i18n("pendingRentalPosts")}
              value={status?.value?.rent?.inactive || 0}
              Icon={GiSandsOfTime}
            />
          )}

          {status.loading ? (
            <Loader />
          ) : (
            <Card
              title={i18n("officesOrders")}
              value={status?.value?.order?.total || 0}
              Icon={GiSandsOfTime}
            />
          )}
        </CardsContainer>

        {!!pendingRentalPosts.list.length && !pendingRentalPosts.loading && (
          <ItemsSection
            title={i18n("pendingRentalPosts")}
            type="section"
            onSeeMore={handleSeeMorePendingRentalPosts}
          >
            {pendingRentalPosts.loading ? (
              <Loader />
            ) : (
              pendingRentalPosts.list.map((rentCar) => (
                <PendingRentCar key={rentCar._id} data={rentCar} />
              ))
            )}
          </ItemsSection>
        )}

        {!!rentCars.list.length && (
          <ItemsSection
            title={i18n("rentCars")}
            type="section"
            onSeeMore={handleSeeMoreRentCars}
          >
            {rentCars.loading ? (
              <Loader />
            ) : (
              rentCars.list.map((rentCar) => (
                <AdminRentCar key={rentCar._id} data={rentCar} />
              ))
            )}
          </ItemsSection>
        )}

        {!!purcahseCars.list.length && (
          <ItemsSection
            title={i18n("purchaseCars")}
            type="section"
            onSeeMore={handleSeeMorePurcahseCars}
          >
            {purcahseCars.loading ? (
              <Loader />
            ) : (
              purcahseCars.list.map((purchaseCar) => (
                <PurchaseCar key={purchaseCar._id} data={purchaseCar} />
              ))
            )}
          </ItemsSection>
        )}

        {!!purcahseCars.list.length && (
          <ItemsSection
            title={i18n("officesOrders")}
            type="section"
            onSeeMore={handleSeeMoreOfficeOrders}
          >
            {purcahseCars.loading ? (
              <Loader />
            ) : (
              purcahseCars.list.map((purchaseCar) => (
                <PurchaseCar key={purchaseCar._id} data={purchaseCar} />
              ))
            )}
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
  background-color: #fafafa;
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

const TopContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button {
    width: fit-content;
    padding: 0 15px;
  }
`;

const PageTitle = styled.h1`
  text-transform: capitalize;
  font-size: 26px;
  font-weight: 600;
  color: #fe7777;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  gap: 20px;
`;

export default MainScreen;
