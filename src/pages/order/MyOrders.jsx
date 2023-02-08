import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import RentCar from "components/car/rent";
import PurchaseCar from "components/car/purchase";
import EmptyList from "components/common/empty-list";
import { routes } from "client";
import OrdersTable from "components/orders-table";
import carsData from "static/carsData";
import OrderDetails from "hoc/OrderDetails";
import CustomButton from "components/common/custom-button";
import PopupConfirm from "hoc/PopupConfirm";
import rentOrdersApi from "api/car/rentOrders";
import Loader from "components/loader";

const MyOrders = () => {
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
    rentOrdersApi.common
      .getMyOrders(0)
      .then((res) =>
        setOrders({ ...orders, loading: false, all: res.data.orders })
      )
      .catch((err) => setOrders({ ...orders, loading: false }));
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

  const handleCompleteOrder = (order) => {
    navigate(routes.completeOrder.navigate(order._id));
  };

  const handleCancelOrder = (orderId) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const cancelOrder = () => {
      // TODO: write cancel order code

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: cancelOrder,
      title: "cancel order",
      subtitle: "Do you really want to cancel order?",
      hint: "You can only cancel your order while it is pending.",
    });
  };

  const handleDeleteOrder = (orderId) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const deleteOrder = () => {
      // TODO: write cancel order code

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: deleteOrder,
      title: "delete order",
      subtitle: "Do you really want to delete order?",
      hint: "You can only delete your order while it is pending.",
    });
  };

  const getButtonContent = () => {
    const status = orders.selectedOrder.status;
    let title = "";
    let onClick = () => {};
    switch (status) {
      case "pending":
        title = "close order";
        onClick = handleCancelOrder;
        break;

      case "rejected":
      case "closed":
        title = "delete order";
        onClick = handleDeleteOrder;
        break;

      case "approved":
        title = "complete order";
        onClick = handleCompleteOrder;
        break;

      default:
        title = "";
        onClick = () => {};
    }

    return { title, onClick };
  };

  return (
    <Container>
      {orders.selectedOrder && (
        <OrderDetails
          order={orders.selectedOrder}
          onHide={handleHideOrderDetails}
        >
          <CustomButton type="primary" {...getButtonContent()} />
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

      <Location pageTitles={["home", ">", "my orders"]} />

      <OrdersContainer>
        {!!orders.all.length ? (
          <OrdersTable
            orders={orders}
            onComplete={handleCompleteOrder}
            onCancel={handleCancelOrder}
            onDelete={handleDeleteOrder}
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
        <ItemsSection type="slider" title="latest cars for rent">
          {latestCars.forRent.map((car) => (
            <RentCar key={car._id} data={car} />
          ))}
        </ItemsSection>

        <ItemsSection type="slider" title="latest cars for sale">
          {latestCars.forSale.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>
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

export default MyOrders;
