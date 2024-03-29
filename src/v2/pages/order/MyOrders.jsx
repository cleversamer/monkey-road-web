import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import EmptyList from "v2/components/common/empty-list";
import { routes } from "v2/client";
import OrdersTable from "v2/components/orders-table";
import carsData from "v2/static/carsData";
import OrderDetails from "v2/hoc/OrderDetails";
import CustomButton from "v2/components/common/custom-button";
import PopupConfirm from "v2/hoc/PopupConfirm";
import rentOrdersApi from "v2/api/car/rentOrders";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";
import Pagination from "v2/components/pagination";

const pageSize = 10;

const MyOrders = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [popupConfirm, setPopupConfirm] = useState({
    visible: false,
    onConfirm: null,
    title: "",
    subtitle: "",
    hint: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState({
    all: [],
    view: [],
    statuses: carsData.orderStatuses,
    purposes: carsData.orderPurposes,
    selectedStatus: "all",
    selectedOrder: null,
    loading: true,
    totalPages: 0,
  });

  useEffect(() => {
    rentOrdersApi.common
      .getMyOrders(currentPage, pageSize)
      .then((res) => {
        const { orders, totalPages } = res.data;
        setOrders({
          ...orders,
          loading: false,
          all: orders,
          view: orders,
          totalPages,
          selectedStatus: "all",
        });
      })
      .catch(() => setOrders({ ...orders, loading: false, totalPages: 0 }));
  }, [currentPage]);

  const handleGoShopping = () => navigate(routes.rentCars.navigate());

  const handleFilterItems = (title) => {
    const viewList =
      title === "all"
        ? [...orders.all]
        : orders.all.filter((order) => order.status === title);

    setOrders({ ...orders, selectedStatus: title, view: viewList });
  };

  const handleViewOrderDetails = (order) =>
    setOrders({ ...orders, selectedOrder: order });

  const handleHideOrderDetails = () =>
    setOrders({ ...orders, selectedOrder: null });

  const handleCompleteOrder = (orderId) =>
    navigate(routes.payOrder.navigate(orderId));

  const handleCancelOrder = (orderId) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const cancelOrder = () => {
      rentOrdersApi.common
        .cancelOrder(orderId)
        .then(() => {
          let index = orders.all.findIndex((o) => o._id === orderId);
          const newAllOrders = [...orders.all];
          newAllOrders[index].status = "closed";

          index = orders.view.findIndex((o) => o._id === orderId);
          const newViewOrders = [...orders.view];
          if (index >= 0) {
            newViewOrders[index].status = "closed";
          }

          setOrders({ ...orders, all: newAllOrders, view: newViewOrders });
        })
        .catch(() => {});

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: cancelOrder,
      title: i18n("cancelOrderTitle"),
      subtitle: i18n("cancelOrderSubtitle"),
      hint: i18n("cancelOrderHint"),
    });
  };

  const handleDeleteOrder = (orderId) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const deleteOrder = () => {
      rentOrdersApi.common
        .deleteOrder(orderId)
        .then(() => {
          const newAllOrders = orders.all.filter((o) => o._id !== orderId);
          const newViewOrders = orders.view.filter((o) => o._id !== orderId);
          setOrders({
            ...orders,
            all: newAllOrders,
            view: newViewOrders,
            selectedStatus: "all",
          });
        })
        .catch(() => {});

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: deleteOrder,
      title: i18n("deleteOrderTitle"),
      subtitle: i18n("deleteOrderSubtitle"),
      hint: i18n("deleteOrderHint"),
    });
  };

  const getButtonContent = () => {
    const status = orders.selectedOrder.status;
    let title = "";
    let onClick = () => {};
    switch (status) {
      case "pending":
        title = i18n("cancelOrderTitle");
        onClick = () => handleCancelOrder(orders.selectedOrder._id);
        break;

      case "rejected":
      case "closed":
        title = i18n("deleteOrderTitle");
        onClick = () => handleDeleteOrder(orders.selectedOrder._id);
        break;

      case "approved":
        title = i18n("completeOrderTitle");
        onClick = () => handleCompleteOrder(orders.selectedOrder._id);
        break;

      default:
        title = "";
        onClick = () => {};
    }

    return { title, onClick };
  };

  const handleNextPage = () => {
    if (currentPage === orders.totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleSelectPage = (pageNumber) => setCurrentPage(pageNumber);

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

      <Location pageTitles={[i18n("home"), i18n("arrow"), i18n("orders")]} />

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
            title={i18n("empty")}
            buttonTitle={i18n("goShopping")}
            imageURL="/assets/images/empty-1.svg"
            onClick={handleGoShopping}
          />
        )}

        {!!orders.all.length && (
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              totalPages={orders.totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onSelectPage={handleSelectPage}
            />
          </PaginationContainer>
        )}
      </OrdersContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fff;
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

const PaginationContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export default MyOrders;
