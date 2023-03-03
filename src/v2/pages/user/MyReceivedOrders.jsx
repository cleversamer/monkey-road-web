import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import EmptyList from "v2/components/common/empty-list";
import { routes } from "v2/client";
import OrdersTable from "v2/components/received-orders-table";
import carsData from "v2/static/carsData";
import OrderDetails from "v2/hoc/OrderDetails";
import CustomButton from "v2/components/common/custom-button";
import PopupConfirm from "v2/hoc/PopupConfirm";
import rentApi from "v2/api/car/rent";
import purchaseApi from "v2/api/car/purchase";
import rentOrdersApi from "v2/api/car/rentOrders";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";
import useAutoScroll from "v2/hooks/useAutoScroll";
import Pagination from "v2/components/pagination";

const pageSize = 10;

const MyReceivedOrders = () => {
  useAutoScroll();
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [popupConfirm, setPopupConfirm] = useState({
    visible: false,
    onConfirm: null,
    title: "",
    subtitle: "",
    hint: "",
    withValue: false,
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
  const [latestCars, setLatestCars] = useState({ forRent: [], forSale: [] });

  useEffect(() => {
    // fetch orders
    rentOrdersApi.office
      .getMyReceivedOrders(currentPage, pageSize)
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

  useEffect(() => {
    // fetch latest rent cars
    rentApi.common
      .getAllRentCars()
      .then((res) => setLatestCars({ ...latestCars, forRent: res.data.cars }))
      .catch(() => {});

    // fetch latest purchase cars
    purchaseApi.common
      .getRecentlyArrivedPurchaseCars()
      .then((res) => setLatestCars({ ...latestCars, forSale: res.data.cars }))
      .catch(() => {});
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
      // TODO

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: approveOder,
      title: "approve order",
      subtitle: "Do you really want to approve order?",
      hint: "You can only approve pending orders.",
      withValue: false,
    });
  };

  const handleRejectOrder = (order) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const rejectOder = (rejectionReason) => {
      // TODO

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: rejectOder,
      title: "reject order",
      subtitle: "Do you really want to reject order?",
      hint: "You can only reject pending orders.",
      withValue: true,
    });
  };

  const handleDeliverOrder = (order) => {
    if (popupConfirm.visible) return;

    handleHideOrderDetails();

    const deliverOder = () => {
      // TODO

      setPopupConfirm({ visible: false, handler: null });
    };

    setPopupConfirm({
      visible: true,
      onConfirm: deliverOder,
      title: i18n("deliverOrderTitle"),
      subtitle: i18n("deliverOrderSubtitle"),
      hint: i18n("deliverOrderHint"),
    });
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
          withValue={popupConfirm.withValue}
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

      <Location
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("profile"),
          i18n("arrow"),
          i18n("receivedOrders"),
        ]}
      />

      <OrdersContainer>
        {!!orders.all.length ? (
          <OrdersTable
            orders={orders}
            onApprove={handleApproveOrder}
            onReject={handleRejectOrder}
            onDeliver={handleDeliverOrder}
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

export default MyReceivedOrders;
