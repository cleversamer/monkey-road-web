import { useEffect, useState } from "react";
import styled from "styled-components";
import parseDate from "v2/utils/parseDate";
import useLocale from "v2/hooks/useLocale";

const DesktopOrder = ({
  order,
  onApprove,
  onReject,
  onDeliver,
  onViewDetails,
}) => {
  const { lang, i18n } = useLocale();
  const [time, setTime] = useState(parseDate(order.date, lang));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(parseDate(order.date, lang));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lang]);

  return (
    <Container>
      <Desktop>
        <ItemContainer>
          <Image src={order.rentCar.photos[0]} alt={order.rentCar.name} />
        </ItemContainer>

        <ItemContainer>
          <OrderPrice>
            {order.totalPrice.toLocaleString()} {i18n("aed")}
          </OrderPrice>
        </ItemContainer>

        <ItemContainer>
          <OrderStatus status={order.status}>{i18n(order.status)}</OrderStatus>
        </ItemContainer>

        <ItemContainer onClick={() => onViewDetails(order)}>
          <OrderDetails>{i18n("details")}</OrderDetails>
        </ItemContainer>

        <ItemContainer>
          {lang === "ar" && i18n("ago")} {time} {lang === "en" && i18n("ago")}
        </ItemContainer>

        <ItemContainer>
          {order.status === "pending" && (
            <ApproveButton onClick={() => onApprove(order._id)}>
              {i18n("approve")}
            </ApproveButton>
          )}

          {["pending", "approved"].includes(order.status) && (
            <RejectButton onClick={() => onReject(order._id)}>
              {i18n("reject")}
            </RejectButton>
          )}

          {order.status === "paid" && (
            <DeliverButton onClick={() => onDeliver(order._id)}>
              {i18n("deliver")}
            </DeliverButton>
          )}
        </ItemContainer>
      </Desktop>

      <BreakLine />
    </Container>
  );
};

const Container = styled.div``;

const Desktop = styled.li`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;

  @media screen and (max-width: 620px) {
    display: none;
  }
`;

const ItemContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const OrderPrice = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #303030;
`;

const OrderStatus = styled.span`
  color: #fff;
  padding: 5px;
  border-radius: 6px;
  background-color: ${({ status }) =>
    ["pending", "approved", "paid"].includes(status)
      ? "#FFA500"
      : status === "deliverd"
      ? "#1A8331"
      : "#f00"};
`;

const OrderDetails = styled.span`
  color: #001aff;
  text-decoration: underline;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100px;
  border-radius: 6px;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  text-transform: capitalize;
  text-decoration: underline;
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.96);
  }
`;

const ApproveButton = styled(Button)`
  color: #38a34f;
`;

const RejectButton = styled(Button)`
  color: #f00;
`;

const DeliverButton = styled(Button)`
  color: #38a34f;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #ccc;
  margin: 0 auto;

  @media screen and (max-width: 620px) {
    display: none;
  }
`;

export default DesktopOrder;
