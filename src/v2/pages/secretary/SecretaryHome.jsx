import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SecretarySidebar from "v2/components/secretary/sidebar";
import CustomButton from "v2/components/common/custom-button";
import { AiFillCar } from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";
import ItemsSection from "v2/components/common/items-section";
import useLocale from "v2/hooks/useLocale";
import Card from "v2/components/admin/card";
import PendingRentCar from "v2/components/car/pending-rental";
import AdminRentCar from "v2/components/admin-rent-car";
import PurchaseCar from "v2/components/admin/purchase-car";
import Loader from "v2/components/loader";
import usersApi from "v2/api/user/users";
import rentApi from "v2/api/car/rent";
import rentOrders from "v2/api/car/rentOrders";
import purchaseApi from "v2/api/car/purchase";
import OfficeOrder from "v2/components/admin/office-order";
import { routes } from "v2/client";
import PopupOffice from "v2/hoc/PopupOffice";

const SecretaryHome = () => {
  const navigate = useNavigate();
  const { i18n, lang } = useLocale();
  const [status, setStatus] = useState({ loading: true, value: {} });
  const [rentCars, setRentCars] = useState({ list: [], loading: true });
  const [purchaseCars, setPurchaseCars] = useState({ list: [], loading: true });
  const [officeOrders, setOfficeOrders] = useState({ list: [], loading: true });
  const [popupOffice, setPopupOffice] = useState({
    office: null,
    visible: false,
  });
  const [pendingRentalPosts, setPendingRentalPosts] = useState({
    list: [],
    loading: true,
  });

  useEffect(() => {
    usersApi.admin
      .getCarsStatus()
      .then((res) => setStatus({ loading: false, value: res.data }))
      .catch(() => setStatus({ loading: false, value: {} }));

    rentApi.admin
      .getNotAcceptedRentCars(1, 3)
      .then((res) =>
        setPendingRentalPosts({ loading: false, list: res.data.rentCars })
      )
      .catch(() => setPendingRentalPosts({ loading: false, list: [] }));

    rentApi.common
      .getAllRentCars(1, 3)
      .then((res) => setRentCars({ loading: false, list: res.data.rentCars }))
      .catch(() => setRentCars({ loading: false, list: [] }));

    purchaseApi.common
      .getRecentlyArrivedPurchaseCars(1, 3)
      .then((res) =>
        setPurchaseCars({ loading: false, list: res.data.purchaseCars })
      )
      .catch(() => setPurchaseCars({ loading: false, list: [] }));

    rentOrders.admin
      .getAllOrders(1, 3)
      .then((res) => setOfficeOrders({ loading: false, list: res.data.orders }))
      .catch(() => setOfficeOrders({ loading: false, list: [] }));
  }, []);

  const handleAddBrand = () => navigate(routes.secretaryAddBrand.navigate());

  const handleSeeMorePendingRentalPosts = () =>
    navigate(routes.secretaryPendingRentalPosts.navigate());

  const handleSeeMoreRentCars = () =>
    navigate(routes.secretaryAllRentCars.navigate());

  const handleSeeMorePurcahseCars = () =>
    navigate(routes.secretaryAllPurchaseCars.navigate());

  const handleSeeMoreOfficeOrders = () =>
    navigate(routes.secretaryAllOfficesOrders.navigate());

  const handleAcceptCar = async (rentCarId) => {
    try {
      await rentApi.admin.acceptRentCar(rentCarId);
      const newPendingRentalPosts = pendingRentalPosts.list.filter(
        (rentCar) => rentCar._id !== rentCarId
      );

      setPendingRentalPosts({
        ...pendingRentalPosts,
        list: newPendingRentalPosts,
      });
    } catch (err) {}
  };

  const handleViewOfficeDetails = (office) =>
    setPopupOffice({ office, visible: true });

  const handleViewOfficeInSearch = (office) =>
    navigate(routes.secretarySearchOffices.navigate(office.email));

  return (
    <>
      {popupOffice.visible && (
        <PopupOffice
          office={popupOffice.office}
          onHide={() => setPopupOffice({ office: null, visible: false })}
          onViewInSearch={handleViewOfficeInSearch}
        />
      )}

      <Container lang={lang}>
        <SecretarySidebar activeItem="home" />

        <Content>
          <TopContainer lang={lang}>
            <PageTitle>{i18n("home")}</PageTitle>

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
                value={status?.value?.rent?.total?.toLocaleString() || 0}
                Icon={AiFillCar}
                onClick={() => navigate(routes.secretaryAllRentCars.navigate())}
              />
            )}

            {status.loading ? (
              <Loader />
            ) : (
              <Card
                title={i18n("purchaseCars")}
                value={status?.value?.purchase?.total?.toLocaleString() || 0}
                Icon={AiFillCar}
                onClick={() =>
                  navigate(routes.secretaryAllPurchaseCars.navigate())
                }
              />
            )}

            {status.loading ? (
              <Loader />
            ) : (
              <Card
                title={i18n("pendingRentalPosts")}
                value={status?.value?.rent?.inactive?.toLocaleString() || 0}
                Icon={GiSandsOfTime}
                onClick={() =>
                  navigate(routes.secretaryPendingRentalPosts.navigate())
                }
              />
            )}

            {status.loading ? (
              <Loader />
            ) : (
              <Card
                title={i18n("officesOrders")}
                value={status?.value?.order?.total?.toLocaleString() || 0}
                Icon={GiSandsOfTime}
                onClick={() =>
                  navigate(routes.secretaryAllOfficesOrders.navigate())
                }
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
                  <PendingRentCar
                    key={rentCar._id}
                    data={rentCar}
                    onAccept={() => handleAcceptCar(rentCar._id)}
                  />
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

          {!!purchaseCars.list.length && (
            <ItemsSection
              title={i18n("purchaseCars")}
              type="section"
              onSeeMore={handleSeeMorePurcahseCars}
            >
              {purchaseCars.loading ? (
                <Loader />
              ) : (
                purchaseCars.list.map((purchaseCar) => (
                  <PurchaseCar key={purchaseCar._id} data={purchaseCar} />
                ))
              )}
            </ItemsSection>
          )}

          {!!officeOrders.list.length && (
            <ItemsSection
              title={i18n("officesOrders")}
              type="section"
              onSeeMore={handleSeeMoreOfficeOrders}
            >
              {purchaseCars.loading ? (
                <Loader />
              ) : (
                officeOrders.list.map((order) => (
                  <OfficeOrder
                    key={order._id}
                    data={order}
                    onViewOfficeDetails={() =>
                      handleViewOfficeDetails(order.office[0])
                    }
                  />
                ))
              )}
            </ItemsSection>
          )}
        </Content>
      </Container>
    </>
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

export default SecretaryHome;
