import { useEffect, useState } from "react";
import styled from "styled-components";
import parseDate from "v2/utils/parseDate";

const DesktopReceivedOrder = ({
  order,
  onApprove,
  onReject,
  onViewDetails,
}) => {
  const [time, setTime] = useState(parseDate(order.date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(parseDate(order.date));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Desktop>
        <ItemContainer>
          <Image src={order.rentCar.photos[0]} alt={order.rentCar.name} />
        </ItemContainer>

        <ItemContainer>
          <OrderPrice>{order.totalPrice.toLocaleString()} AED</OrderPrice>
        </ItemContainer>

        <ItemContainer>
          <OrderStatus status={order.status}>{order.status}</OrderStatus>
        </ItemContainer>

        <ItemContainer link onClick={() => onViewDetails(order)}>
          details
        </ItemContainer>

        <ItemContainer lowercase>{time} ago</ItemContainer>

        <ItemContainer>
          {order.status === "pending" && (
            <>
              <ApproveButton onClick={() => onApprove(order)}>
                approve
              </ApproveButton>

              <RejectButton onClick={() => onReject(order)}>
                reject
              </RejectButton>
            </>
          )}

          {order.status !== "pending" && <NoneButton>none</NoneButton>}
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
  color: #000;
`;

const OrderStatus = styled.span`
  color: ${({ status }) =>
    status === "pending"
      ? "#fe7777"
      : ["rejected", "closed"].includes(status)
      ? "red"
      : status === "approved"
      ? "green"
      : "#000"};
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

const NoneButton = styled(Button)`
  color: #001aff;
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

export default DesktopReceivedOrder;
