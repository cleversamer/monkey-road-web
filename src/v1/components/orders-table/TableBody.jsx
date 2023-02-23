import styled from "styled-components";
import Order from "v1/components/order";

const TableBody = ({
  orders,
  onComplete,
  onCancel,
  onDelete,
  onViewDetails,
}) => {
  return (
    <Container>
      {orders.map((order) => (
        <Order
          key={order._id}
          order={order}
          onCancel={onCancel}
          onComplete={onComplete}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
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
