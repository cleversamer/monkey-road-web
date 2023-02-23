import styled from "styled-components";
import FiltersSection from "./FiltersSection";
import TableBody from "./TableBody";
import TableHeadings from "./TableHeadings";

const headings = [
  "products",
  "total",
  "status",
  "details",
  "date",
  "operations",
];

const OrdersTable = ({
  orders,
  onApprove,
  onReject,
  onSelectItem,
  onViewDetails,
}) => {
  return (
    <Container>
      <FiltersSection orders={orders} onSelectItem={onSelectItem} />
      <BreakLine />
      <TableHeadings headings={headings} />
      <TableBody
        orders={orders.view}
        onApprove={onApprove}
        onReject={onReject}
        onViewDetails={onViewDetails}
      />
    </Container>
  );
};

const Container = styled.div`
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

  @media screen and (max-width: 620px) {
    display: none;
  }
`;

export default OrdersTable;
