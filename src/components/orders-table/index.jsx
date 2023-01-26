import styled from "styled-components";
import Order from "../order";

const headings = [
  "products",
  "total",
  "status",
  "details",
  "date",
  "operations",
];

const OrdersTable = ({ orders = [] }) => {
  const handleCompleteOrder = () => {};

  const handleCancelOrder = () => {};

  const handleDeleteOrder = () => {};

  return (
    <Container>
      <Headings>
        {headings.map((heading, index) => (
          <TableHeading key={index}>{heading}</TableHeading>
        ))}
      </Headings>

      <BreakLine />

      <TableBody>
        {orders.map((order) => (
          <Order
            key={order._id}
            order={order}
            onCancel={handleCancelOrder}
            onComplete={handleCompleteOrder}
            onDelete={handleDeleteOrder}
          />
        ))}
      </TableBody>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Headings = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  @media screen and (max-width: 620px) {
    display: none;
  }
`;

const TableHeading = styled.li`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
`;

const TableBody = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 620px) {
    gap: 15px;
  }
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

export default OrdersTable;
