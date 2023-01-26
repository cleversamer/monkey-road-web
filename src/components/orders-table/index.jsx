import styled from "styled-components";
import Order from "./Order";

const headings = [
  "products",
  "total",
  "status",
  "details",
  "date",
  "operations",
];

const OrdersTable = ({ orders = [] }) => {
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
          <>
            <Order key={order._id} data={order} />
            <BreakLine />
          </>
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
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #ccc;
  margin: 0 auto;
`;

export default OrdersTable;
