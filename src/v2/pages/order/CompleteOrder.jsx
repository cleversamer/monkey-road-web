import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AddCar from "v2/components/common/add-car";
import PaymentMethods from "v2/components/common/payment-form/PaymentMethods";
import StripeForm from "v2/components/common/payment-form/StripeForm";
import PaypalForm from "v2/components/common/payment-form/PaypalForm";
import CustomButton from "v2/components/common/custom-button";
import PopupMessage from "v2/hoc/PopupMessage";
import rentOrdersApi from "v2/api/car/rentOrders";
import Loader from "v2/components/loader";
import { routes } from "v2/client";

const CompleteOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [context, setContext] = useState({
    order: null,
    paymentMethod: "debit",
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
    postalCode: "",
    month: "",
    year: "",
    loading: true,
  });

  useEffect(() => {
    rentOrdersApi.common
      .getOrderDetails(orderId)
      .then((res) =>
        setContext({ ...context, loading: false, order: res.data })
      )
      .catch(() => setContext({ ...context, loading: false, order: null }));
  }, []);

  const invoiceItems = [
    { title: "car rental", cost: context?.order?.totalPrice },
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

  if (!context.order && context.loading) {
    return <Loader />;
  }

  if (!context.order) {
    navigate(routes.myOrders.navigate());
  }

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
