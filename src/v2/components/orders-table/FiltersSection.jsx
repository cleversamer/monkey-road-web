import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import FilterItem from "./FilterItem";

const FiltersSection = ({ orders, onSelectItem }) => {
  const { i18n, lang } = useLocale();

  const ordersCount = orders.all.length;
  const pendingOrdersCount = getOrdersCount("pending");
  const approvedOrdersCount = getOrdersCount("approved");
  const rejectedOrdersCount = getOrdersCount("rejected");
  const cancelledOrdersCount = getOrdersCount("closed");

  function getOrdersCount(status) {
    return orders.all.filter((order) => {
      return order.status === status;
    }).length;
  }

  function checkItemSelected(title) {
    return orders.selectedStatus === title;
  }

  return (
    <Container>
      <StatusFilters lang={lang}>
        <FilterItem
          title={i18n("all")}
          count={ordersCount}
          active={checkItemSelected("all")}
          onClick={() => onSelectItem("all")}
        />

        <FilterItem
          title={i18n("pending")}
          count={pendingOrdersCount}
          active={checkItemSelected("pending")}
          onClick={() => onSelectItem("pending")}
        />

        <FilterItem
          title={i18n("approved")}
          count={approvedOrdersCount}
          active={checkItemSelected("approved")}
          onClick={() => onSelectItem("approved")}
        />

        <FilterItem
          title={i18n("rejected")}
          count={rejectedOrdersCount}
          active={checkItemSelected("rejected")}
          onClick={() => onSelectItem("rejected")}
        />

        <FilterItem
          title={i18n("closed")}
          count={cancelledOrdersCount}
          active={checkItemSelected("closed")}
          onClick={() => onSelectItem("closed")}
        />
      </StatusFilters>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  overflow-x: auto;
`;

const StatusFilters = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 20px;
  min-width: max-content;
`;

export default FiltersSection;
