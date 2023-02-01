import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AddCar from "components/common/add-car";
import PaymentMethods from "components/common/payment-form/PaymentMethods";
import StripeForm from "components/common/payment-form/StripeForm";
import PaypalForm from "components/common/payment-form/PaypalForm";
import CustomButton from "components/common/custom-button";
import PopupMessage from "hoc/PopupMessage";
import { routes } from "client";

const testOrder = {
  _id: 1,
  totalPrice: 1000,
  status: "approved",
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
  fullName: "Samer Al-Sa'dawi",
  phoneNumber: {
    full: "+972597367603",
    icc: "+972",
    nsn: "597367603",
  },
  receptionLocation: {
    title: "United states, california, AS89 St.",
    longitude: -180,
    latitude: -90,
  },
  date: "Fri Jan 26 2023 9:28:46 GMT+0200 (Eastern European Standard Time)",
  startDate:
    "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
  endDate: "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
};

const CompleteOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [context, setContext] = useState({
    order: testOrder,
    paymentMethod: "debit",
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
    postalCode: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    // fetch order
  }, []);

  const invoiceItems = [
    { title: "car rental", cost: context.order.totalPrice },
  ];

  const handleKeyChange = (key) => (e) => {
    try {
      const value = e.target.value;
      const newValue =
        !value && typeof context[key] === "number"
          ? 0
          : !value && typeof context[key] === "string"
          ? ""
          : typeof context[key] === "number"
          ? parseInt(value)
          : value;

      setContext({ ...context, [key]: newValue });
    } catch (err) {}
  };

  const handleComplete = () => {
    setShowPopup(true);
  };

  const handleBackToHome = () => {
    navigate(routes.home.navigate());
  };

  return (
    <>
      {showPopup && (
        <PopupMessage
          imageURL="/assets/images/arrow-right.svg"
          title="Send order"
          subtitle="operation accomplished successfully"
          onHide={() => setShowPopup(false)}
        >
          <CustomButton
            type="primary"
            title="Back to home"
            onClick={handleBackToHome}
          />
        </PopupMessage>
      )}

      <AddCar pageTitles={["home", ">", "orders", ">", "complete order"]}>
        <Container>
          <ShippingAddress>
            <ShippingTitle>shipping address</ShippingTitle>

            <ShippingItems>
              <ShippingItem>{context.order.fullName}</ShippingItem>
              <ShippingItem>{context.order.phoneNumber.full}</ShippingItem>
              <ShippingItem>
                {context.order.receptionLocation.title}
              </ShippingItem>
            </ShippingItems>
          </ShippingAddress>

          <PaymentMethods
            paymentMethod={context.paymentMethod}
            onChange={handleKeyChange("paymentMethod")}
          />

          {context.paymentMethod === "debit" ? (
            <StripeForm
              items={invoiceItems}
              onKeyChange={handleKeyChange}
              context={context}
            />
          ) : (
            <PaypalForm items={invoiceItems} />
          )}

          <CustomButton
            type="primary"
            title="check out"
            onClick={handleComplete}
          />
        </Container>
      </AddCar>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: -70px;

  button {
    width: 200px;
    margin-top: 10px;
  }

  @media screen and (max-width: 480px) {
    max-width: 300px;
  }
`;

const ShippingAddress = styled.div`
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  height: 120px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const ShippingTitle = styled.h4`
  text-transform: capitalize;
`;

const ShippingItems = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

const ShippingItem = styled.li`
  font-size: 14px;
  color: #747474;
`;

export default CompleteOrder;
