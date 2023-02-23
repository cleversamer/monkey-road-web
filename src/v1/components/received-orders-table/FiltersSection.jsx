import styled from "styled-components";

const FiltersSection = ({ orders, onSelectItem }) => {
  const ordersCount = orders.all.length;
  const pendingOrdersCount = getOrdersCount("pending");
  const approvedOrdersCount = getOrdersCount("approved");
  const rejectedOrdersCount = getOrdersCount("rejected");

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
      <StatusFilters>
        <Item
          active={checkItemSelected("all")}
          onClick={() => onSelectItem("all")}
        >
          all ({ordersCount})
        </Item>

        <Item
          active={checkItemSelected("pending")}
          onClick={() => onSelectItem("pending")}
        >
          pending ({pendingOrdersCount})
        </Item>

        <Item
          active={checkItemSelected("approved")}
          onClick={() => onSelectItem("approved")}
        >
          approved ({approvedOrdersCount})
        </Item>

        <Item
          active={checkItemSelected("rejected")}
          onClick={() => onSelectItem("rejected")}
        >
          rejected ({rejectedOrdersCount})
        </Item>
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
  list-style: none;
  display: flex;
  align-items: center;
  gap: 30px;
  min-width: max-content;
`;

const Item = styled.li`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  color: ${({ active }) => (active ? "#fe7777" : "#000")};
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    color: #fe7777;
  }

  :active {
    transform: scale(0.97);
  }
`;

export default FiltersSection;
