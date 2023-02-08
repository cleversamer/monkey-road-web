import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import RentCar from "components/car/rent";
import PurchaseCar from "components/car/purchase";
import EmptyList from "components/common/empty-list";
import { routes } from "client";
import OrdersTable from "components/received-orders-table";
import carsData from "static/carsData";
import OrderDetails from "hoc/OrderDetails";
import CustomButton from "components/common/custom-button";
import PopupConfirm from "hoc/PopupConfirm";
import rentApi from "api/car/rent";
import purchaseApi from "api/car/purchase";
import rentOrdersApi from "api/car/rentOrders";
import Loader from "components/loader";

const MyReceivedOrders = () => {
  const navigate = useNavigate();
  const [popupConfirm, setPopupConfirm] = useState({
    visible: false,
    onConfirm: null,
    title: "",
    subtitle: "",
    hint: "",
  });
  const [orders, setOrders] = useState({
    all: [],
    view: [],
    statuses: carsData.orderStatuses,
    purposes: carsData.orderPurposes,
    selectedStatus: "all",
    selectedOrder: null,
    loading: true,
  });
  const [latestCars, setLatestCars] = useState({ forRent: [], forSale: [] });

  useEffect(() => {
    // fetch orders
    rentOrdersApi.office
      .getMyReceivedOrders(0)
      .then((res) =>
        setOrders({ ...orders, all: res.data.orders, loading: false })
      )
      .catch((err) => setOrders({ ...orders, loading: false }));

    // fetch latest rent cars
    rentApi.common
      .getAllRentCars()
      .then((res) => setLatestCars({ ...latestCars, forRent: res.data.cars }))
      .catch((err) => {});

    // fetch latest purchase cars
    purchaseApi.common
      .getAllPurchaseCars()
      .then((res) => setLatestCars({ ...latestCars, forSale: res.data.cars }))
      .catch((err) => {});
  }, []);

  const handleGoShopping = () => navigate(routes.rentCars.navigate());

  const handleFilterItems = (title) => {
    const viewList =
      title === "all"
        ? [...orders.all]
        : orders.all.filter((order) => order.status === title);

    setOrders({ ...orders, selectedStatus: title, view: viewList });
  };

  const handleViewOrderDetails = (order) => {
    setOrders({ ...orders, selectedOrder: order });
  };

  const handleHideOrderDetails = () => {
    setOrders({ ...orders, selectedOrder: null });
  };

  const handleApproveOrder = (order) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const approveOder = () => {
      // approve order code

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: approveOder,
      title: "approve order",
      subtitle: "Do you really want to approve order?",
      hint: "You can only approve pending orders.",
    });
  };

  const handleRejectOrder = (order) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const rejectOder = () => {
      // rejecr order code

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: rejectOder,
      title: "reject order",
      subtitle: "Do you really want to reject order?",
      hint: "You can only reject pending orders.",
    });
  };

  return (
    <Container>
      {orders.selectedOrder && (
        <OrderDetails
          order={orders.selectedOrder}
          onHide={handleHideOrderDetails}
        >
          {orders.selectedOrder.status === "pending" && (
            <>
              <CustomButton
                type="primary"
                title="approve"
                onClick={handleApproveOrder}
              />

              <CustomButton
                type="primary"
                title="reject"
                onClick={handleRejectOrder}
              />
            </>
          )}
        </OrderDetails>
      )}

      {popupConfirm.visible && (
        <PopupConfirm
          title={popupConfirm.title}
          subtitle={popupConfirm.subtitle}
          hint={popupConfirm.hint}
          onConfirm={popupConfirm.onConfirm}
          onHide={() =>
            setPopupConfirm({
              visible: false,
              onConfirm: null,
              title: "",
              subtitle: "",
              hint: "",
            })
          }
        />
      )}

      <Location pageTitles={["home", ">", "profile", ">", "received orders"]} />

      <OrdersContainer>
        {!!orders.all.length ? (
          <OrdersTable
            orders={orders}
            onApprove={handleApproveOrder}
            onReject={handleRejectOrder}
            onSelectItem={handleFilterItems}
            onViewDetails={handleViewOrderDetails}
          />
        ) : orders.loading ? (
          <Loader />
        ) : (
          <EmptyList
            title="It's empty here..."
            buttonTitle="go shopping"
            imageURL="/assets/images/empty-1.svg"
            onClick={handleGoShopping}
          />
        )}
      </OrdersContainer>

      <LatestCarsContainer>
        {!!latestCars.forRent.length && (
          <ItemsSection type="slider" title="latest cars for rent">
            {latestCars.forRent.map((car) => (
              <RentCar key={car._id} data={car} />
            ))}
          </ItemsSection>
        )}

        {!!latestCars.forSale.length && (
          <ItemsSection type="slider" title="latest cars for sale">
            {latestCars.forSale.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))}
          </ItemsSection>
        )}
      </LatestCarsContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;

  @media screen and (max-width: 768px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const OrdersContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 80px;
`;

const LatestCarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default MyReceivedOrders;
