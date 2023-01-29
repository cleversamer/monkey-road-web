import styled from "styled-components";
import Order from "components/order";

const TableBody = ({ orders, onComplete, onCancel, onDelete }) => {
  return (
    <Container>
      {orders.map((order) => (
        <Order
          key={order._id}
          order={order}
          onCancel={() => onCancel(order._id)}
          onComplete={() => onComplete(order._id)}
          onDelete={() => onDelete(order._id)}
        />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 620px) {
    gap: 15px;
  }
`;

export default TableBody;
