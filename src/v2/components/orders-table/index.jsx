import styled from "styled-components";
import FiltersSection from "./FiltersSection";
import TableBody from "./TableBody";
import TableHeadings from "./TableHeadings";
import useLocale from "v2/hooks/useLocale";

const OrdersTable = ({
  orders,
  onComplete,
  onCancel,
  onDelete,
  onSelectItem,
  onViewDetails,
}) => {
  const { i18n } = useLocale();

  const headings = [
    i18n("products"),
    i18n("total"),
    i18n("status"),
    i18n("details"),
    i18n("date"),
    i18n("operations"),
  ];

  return (
    <Container>
      <FiltersSection orders={orders} onSelectItem={onSelectItem} />
      <BreakLine />
      <TableHeadings headings={headings} />
      <TableBody
        orders={orders.view}
        onCancel={onCancel}
        onComplete={onComplete}
        onDelete={onDelete}
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
