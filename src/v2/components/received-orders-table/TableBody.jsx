import styled from "styled-components";
import ReceivedOrder from "v2/components/received-order";

const TableBody = ({ orders, onApprove, onReject, onViewDetails }) => {
  return (
    <Container>
      {orders.map((order) => (
        <ReceivedOrder
          key={order._id}
          order={order}
          onApprove={onApprove}
          onReject={onReject}
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
