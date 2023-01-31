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

const testCars = [
  {
    _id: 1,
    imageURL: "/assets/images/car.jpg",
    name: "Car 1",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 2,
    imageURL: "/assets/images/car.jpg",
    name: "Car 2",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 3,
    imageURL: "/assets/images/car.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 4,
    imageURL: "/assets/images/car.jpg",
    name: "Car 4",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 5,
    imageURL: "/assets/images/car.jpg",
    name: "Car 5",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 6,
    imageURL: "/assets/images/car.jpg",
    name: "Car 6",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 7,
    imageURL: "/assets/images/car.jpg",
    name: "Car 7",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 8,
    imageURL: "/assets/images/car.jpg",
    name: "Car 8",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 9,
    imageURL: "/assets/images/car.jpg",
    name: "Car 9",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 10,
    imageURL: "/assets/images/car.jpg",
    name: "Car 10",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 11,
    imageURL: "/assets/images/car.jpg",
    name: "Car 11",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 12,
    imageURL: "/assets/images/car.jpg",
    name: "Car 12",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 13,
    imageURL: "/assets/images/car.jpg",
    name: "Car 13",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 14,
    imageURL: "/assets/images/car.jpg",
    name: "Car 14",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 15,
    imageURL: "/assets/images/car.jpg",
    name: "Car 15",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
];

const testOrders = [
  {
    _id: 1,
    totalPrice: 1000,
    status: "pending",
    date: "Fri Jan 27 2023 12:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 1",
      price: 100000,
      model: "EX",
      year: "2022",
      description: "",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 1.5,
    totalPrice: 1000,
    status: "pending",
    date: "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 2",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 2,
    totalPrice: 1000,
    status: "approved",
    date: "Fri Jan 26 2023 9:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 3",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 2.5,
    totalPrice: 1000,
    status: "approved",
    date: "Fri Jan 26 2023 3:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 4",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 3,
    totalPrice: 1000,
    status: "rejected",
    date: "Fri Jan 26 2023 17:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 5",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 3.5,
    totalPrice: 1000,
    status: "rejected",
    date: "Fri Jan 26 2023 21:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 6",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 4,
    totalPrice: 1000,
    status: "closed",
    date: "Fri Jan 23 2023 19:28:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 7",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
  {
    _id: 4.5,
    totalPrice: 1000,
    status: "closed",
    date: "Fri Jan 21 2023 14:39:46 GMT+0200 (Eastern European Standard Time)",
    startDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    endDate:
      "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    receptionLocation: {
      title: "United states, california, AS89 St.",
      longitude: -180,
      latitude: -90,
    },
    rentCar: {
      _id: 1,
      photos: ["/assets/images/car.jpg"],
      name: "Car 8",
      price: 100000,
      model: "EX",
      year: "2022",
      description:
        "this is a random text just to show up on the description area.",
      brand: {
        _id: 1,
        name: {
          en: "Toyota",
          ar: "تويوتا",
        },
      },
    },
  },
];

const MyReceivedOrders = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState({
    visible: false,
    onConfirm: null,
    title: "",
    subtitle: "",
    hint: "",
  });
  const [orders, setOrders] = useState({
    all: testOrders,
    view: testOrders,
    statuses: carsData.orderStatuses,
    purposes: carsData.orderPurposes,
    selectedStatus: "all",
    selectedOrder: null,
  });
  const [latestCars, setLatestCars] = useState({
    forRent: testCars,
    forSale: testCars,
  });

  useEffect(() => {
    // fetch favorites
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
    if (confirm.visible) return;

    handleHideOrderDetails();

    const approveOder = () => {
      // approve order code

      setConfirm({ visible: false, handler: null });
    };

    setConfirm({
      visible: true,
      onConfirm: approveOder,
      title: "approve order",
      subtitle: "Do you really want to approve order?",
      hint: "You can only approve pending orders.",
    });
  };

  const handleRejectOrder = (order) => {
    if (confirm.visible) return;

    handleHideOrderDetails();

    const rejectOder = () => {
      // rejecr order code

      setConfirm({ visible: false, handler: null });
    };

    setConfirm({
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

      {confirm.visible && (
        <PopupConfirm
          title={confirm.title}
          subtitle={confirm.subtitle}
          hint={confirm.hint}
          onConfirm={confirm.onConfirm}
          onHide={() =>
            setConfirm({
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
        {orders.all.length ? (
          <OrdersTable
            orders={orders}
            onApprove={handleApproveOrder}
            onReject={handleRejectOrder}
            onSelectItem={handleFilterItems}
            onViewDetails={handleViewOrderDetails}
          />
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

export default MyReceivedOrders;
