import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AddCar from "v2/components/common/add-car";
import PaymentMethods from "v2/components/common/payment-form/PaymentMethods";
import CustomButton from "v2/components/common/custom-button";
import PopupMessage from "v2/hoc/PopupMessage";
import rentOrdersApi from "v2/api/car/rentOrders";
import Loader from "v2/components/loader";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";
import PopupError from "v2/hoc/PopupError";

const PayOrder = () => {
  const { lang, i18n } = useLocale();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [context, setContext] = useState({
    order: null,
    paymentMethod: "debit",
    paymentRequested: false,
    orderId: "",
    loading: true,
    error: "",
  });

  useEffect(() => {
    rentOrdersApi.common
      .getOrderDetails(orderId)
      .then((res) =>
        setContext({ ...context, loading: false, order: res.data })
      )
      .catch(() => setContext({ ...context, loading: false, order: null }));
  }, []);

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

  const handleRequestPayment = async () => {
    let error = "";

    try {
      if (context.loading) return;

      setContext({ ...context, loading: true });

      const res = await rentOrdersApi.common.requestPayment(context.order._id);

      window.open(res.data.path, "payment", "width=500,height=500");
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({
        ...context,
        loading: false,
        error,
        paymentRequested: true,
      });
    }
  };

  const handleConfirmPayment = async () => {
    let error = "";

    try {
      if (context.loading) return;

      setContext({ ...context, loading: true });

      await rentOrdersApi.common.confirmPayment(orderId);

      navigate(routes.myOrders.navigate());
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({
        ...context,
        loading: false,
        error,
        paymentRequested: false,
      });
    }
  };

  const handleViewMyOrders = () => navigate(routes.myOrders.navigate());

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
          title={i18n("orderPaidTitle")}
          subtitle={i18n("orderPaidSubtitle")}
          onHide={() => setShowPopup(false)}
        >
          <CustomButton
            type="primary"
            title={i18n("viewMyOrders")}
            onClick={handleViewMyOrders}
          />
        </PopupMessage>
      )}

      {!!context.error && (
        <PopupError
          message={context.error}
          onHide={() => setContext({ ...context, error: "" })}
        />
      )}

      <AddCar
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("orders"),
          i18n("arrow"),
          i18n("payOrder"),
        ]}
      >
        <Container>
          <ShippingAddress>
            <RecipientAddress>{i18n("recipientAddress")}</RecipientAddress>

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

          {context.loading ? (
            <Loader />
          ) : context.paymentRequested ? (
            <CustomButton
              type="primary"
              title={i18n("confirmPayment")}
              onClick={handleConfirmPayment}
            />
          ) : (
            <CustomButton
              type="primary"
              title={i18n("payOrder")}
              onClick={handleRequestPayment}
            />
          )}
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
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.2);
`;

const RecipientAddress = styled.h4`
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

export default PayOrder;
