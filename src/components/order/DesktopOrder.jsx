import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import parseDate from "utils/parseDate";

const DesktopOrder = ({ order, onComplete, onCancel, onDelete }) => {
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
          <Image src={order.rentCar[0].imageURL} alt={order.rentCar[0].name} />
        </ItemContainer>

        <ItemContainer bold primary>
          {order.totalPrice} AED
        </ItemContainer>

        <ItemContainer>{order.status}</ItemContainer>

        <ItemContainer>
          <RouterLink to="">details</RouterLink>
        </ItemContainer>

        <ItemContainer lowercase>{time} ago</ItemContainer>

        <ItemContainer>
          {order.status === "approved" && (
            <CompleteButton onClick={onComplete}>complete</CompleteButton>
          )}

          {["pending", "approved"].includes(order.status) && (
            <CancelButton onClick={onCancel}>cancel</CancelButton>
          )}

          {["rejected", "closed"].includes(order.status) && (
            <DeleteButton onClick={onDelete}>delete</DeleteButton>
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
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? "700" : "500")};
  color: ${({ primary }) => (primary ? "#fe7777" : "#000")};
  text-transform: ${({ lowercase }) =>
    lowercase ? "lowercase" : "capitalize"};

  a {
    color: #001aff;
    text-decoration: underline;
    transition-duration: 176ms;

    :hover {
      color: #fe7777;
    }
  }

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
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

const CompleteButton = styled(Button)`
  color: #fe7777;
`;

const CancelButton = styled(Button)`
  color: #001aff;
`;

const DeleteButton = styled(Button)`
  color: #f00;
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
