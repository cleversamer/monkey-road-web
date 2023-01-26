import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Order = ({ data }) => {
  const mapDate = (strDate) => {
    // Transform date string to date object
    const date = new Date(strDate);

    // Get day
    const day = date.toDateString();

    // Get hours
    let hours = date.getHours();
    hours = hours < 10 ? `0${hours}` : hours;

    // Get mins
    let mins = date.getMinutes();
    mins = mins < 10 ? `0${mins}` : mins;

    // Get hours and mins
    const time = `${hours}:${mins}`;

    return `${day} ${time}`;
  };

  const handleCompleteOrder = () => {};

  const handleCancelOrder = () => {};

  const handleDeleteOrder = () => {};

  return (
    <Container key={data._id}>
      <ItemContainer>
        <Image src={data.rentCar[0].imageURL} alt={data.rentCar[0].name} />
      </ItemContainer>

      <ItemContainer>{data.totalPrice} AED</ItemContainer>

      <ItemContainer>{data.status}</ItemContainer>

      <ItemContainer>
        <RouterLink to="">details</RouterLink>
      </ItemContainer>

      <ItemContainer>{mapDate(data.date)}</ItemContainer>

      <ItemContainer>
        {data.status === "approved" && (
          <CompleteButton>complete</CompleteButton>
        )}

        {["pending", "approved"].includes(data.status) && (
          <CancelButton>cancel</CancelButton>
        )}

        {["rejected", "closed"].includes(data.status) && (
          <DeleteButton>delete</DeleteButton>
        )}
      </ItemContainer>
    </Container>
  );
};

const Container = styled.li`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
`;

const ItemContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;

  a {
    color: #001aff;
    text-decoration: underline;
    transition-duration: 176ms;

    :hover {
      color: #fe7777;
    }
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

export default Order;
