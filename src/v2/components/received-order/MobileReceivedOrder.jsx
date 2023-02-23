import { useEffect, useState } from "react";
import styled from "styled-components";
import parseDate from "v2/utils/parseDate";

const MobileReceivedOrder = ({ order, onApprove, onReject, onViewDetails }) => {
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
      <Row1>
        <Status status={order.status}>{order.status}</Status>
      </Row1>

      <Row2>
        <Image
          src={order.rentCar.photos[0]}
          alt={order.rentCar.name}
          onClick={() => onViewDetails(order)}
        />

        <Row2Left>
          <Price>Total: {order.totalPrice} AED</Price>

          <ButtonsContainer>
            {order.status === "pending" && (
              <>
                <FilledButton onClick={() => onApprove(order)}>
                  approve
                </FilledButton>

                <OutlineButton onClick={() => onReject(order)}>
                  reject
                </OutlineButton>
              </>
            )}
          </ButtonsContainer>
        </Row2Left>
      </Row2>

      <Row3>
        <OrderDate>{time} ago</OrderDate>
      </Row3>
    </Container>
  );
};

const Container = styled.li`
  width: 100%;
  height: 200px;
  background-color: #fff;
  box-shadow: 0px 1px 3px 1px rgba(51, 51, 51, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media screen and (min-width: 621px) {
    display: none;
  }

  @media screen and (max-width: 480px) {
    height: 215px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const Row1 = styled(Row)``;

const Row2 = styled(Row)``;

const Row3 = styled(Row)``;

const Status = styled.h4`
  font-size: 16px;
  text-transform: capitalize;
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
  width: 60%;
  max-width: 150px;
  border-radius: 8px;
`;

const Row2Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const Price = styled.h5`
  font-size: 16px;
  font-weight: 600;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Button = styled.button`
  width: 100px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  outline: none;
  padding: 7px 10px;
  border-radius: 4px;
  text-transform: capitalize;
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.96);
  }
`;

const OutlineButton = styled(Button)`
  background-color: #fff;
  color: #fe7777;
  border: 1px solid #fe7777;
`;

const FilledButton = styled(Button)`
  background-color: #fe7777;
  color: #fff;
`;

const OrderDate = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: gray;
`;

export default MobileReceivedOrder;
