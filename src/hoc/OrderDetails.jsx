import styled from "styled-components";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

const OrderDetails = ({ order, onHide, children }) => {
  useEffect(() => {
    window.onkeydown = function (event) {
      if (event.keyCode == 27) {
        onHide();
      }
    };
  }, []);

  return (
    <PopupContainer>
      <Container>
        <TopRow>
          <IoClose onClick={onHide} />
          <Title>order details</Title>
        </TopRow>

        <OrderStatus status={order.status}>{order.status} order</OrderStatus>

        {!!order.rentCar.description && (
          <RentCarDescription>{order.rentCar.description}</RentCarDescription>
        )}

        <RentCarInfo>
          <RentCarImage
            src={order.rentCar.photos[0]}
            alt={order.rentCar.name}
          />

          <RentCarDetails>
            <RentCarName>{order.rentCar.name}</RentCarName>
            <OrderPrice>{order.totalPrice} AED</OrderPrice>
          </RentCarDetails>
        </RentCarInfo>

        <ReceptionLocation>
          <Title>Shipping address</Title>

          <ReceptionLocationName>
            {order.receptionLocation.title}
          </ReceptionLocationName>
        </ReceptionLocation>

        <CTAContainer>{children}</CTAContainer>
      </Container>
    </PopupContainer>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 350px;
  height: fit-content;
  border-radius: 16px;
  padding: 30px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 176ms;
    font-size: 20px;
    cursor: pointer;

    :active {
      transform: scale(0.97);
    }
  }
`;

const Title = styled.h5`
  text-transform: capitalize;
  font-size: 16px;
`;

const OrderStatus = styled.h6`
  font-size: 14px;
  font-weight: 500;
  color: ${({ status }) =>
    status === "pending"
      ? "#fe7777"
      : ["rejected", "closed"].includes(status)
      ? "red"
      : status === "approved"
      ? "green"
      : "#000"};
  text-transform: capitalize;
`;

const RentCarDescription = styled.p`
  text-align: center;
  font-size: 13px;
`;

const RentCarInfo = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`;

const RentCarImage = styled.img`
  width: 50%;
  border-radius: 8px;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    transform: scale(0.98);
  }

  :active {
    transform: scale(0.96);
  }
`;

const RentCarDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const RentCarName = styled.h6`
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
`;

const OrderPrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`;

const ReceptionLocation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ReceptionLocationName = styled.p`
  font-size: 13px;
`;

const CTAContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    font-size: 15px;
    font-weight: 600;
  }
`;

export default OrderDetails;
