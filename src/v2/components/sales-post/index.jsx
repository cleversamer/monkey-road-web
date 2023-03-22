import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "v2/components/car";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";
import purchaseApi from "v2/api/car/purchase";
import Loader from "../loader";

const SalesPost = ({ data, onMarkCarAsSold, onShowError, onMarkAsPaid }) => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();
  const [paymentRequested, setPaymentRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToDetails = () =>
    navigate(routes.purchaseCarDetails.navigate(data._id));

  const handlePayCost = () => {
    setPaymentRequested(true);
    window.open(data.invoiceURL, "payment", "width=500,height=500");
  };

  const handleConfirmPayment = () => {
    if (loading) return;

    setLoading(true);

    purchaseApi.common
      .payPurchaseCarPost(data._id)
      .then(() => {
        onMarkAsPaid();
      })
      .catch((err) => {
        const error =
          err?.response?.data?.message[lang] || i18n("networkError");
        onShowError(error);
        setPaymentRequested(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ReusableCar
      onClick={navigateToDetails}
      brandName={data.brand.name[lang]}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      price={data.price}
      year={data.year}
    >
      <>
        {loading ? (
          <Loader />
        ) : (
          <CTAContainer>
            {data.paid && !data.sold && (
              <CustomButton
                type="primary"
                onClick={onMarkCarAsSold}
                title={i18n("markAsSold")}
              />
            )}

            {data.paid && (
              <CustomButton
                type="primary"
                onClick={navigateToDetails}
                title={i18n("viewDetails")}
              />
            )}

            {!data.paid && !paymentRequested && (
              <CustomButton
                type="primary"
                onClick={handlePayCost}
                title={i18n("payCost")}
              />
            )}

            {!data.paid && paymentRequested && (
              <CustomButton
                type="primary"
                onClick={handleConfirmPayment}
                title={i18n("confirmPayment")}
              />
            )}
          </CTAContainer>
        )}

        <Badge sold={data.sold} paid={data.paid}>
          {!data.paid
            ? i18n("unpaid")
            : data.sold
            ? i18n("sold")
            : i18n("notSold")}
        </Badge>
      </>
    </ReusableCar>
  );
};

const CTAContainer = styled.div`
  padding: 10px 5px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  gap: 10px;

  > * {
    height: 32px;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
  background-color: ${({ paid, sold }) =>
    !paid ? "#f00" : sold ? "#1A8331" : "#FFA500"};
  padding: 3px 15px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

export default SalesPost;
