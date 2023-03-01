import styled from "styled-components";

const FiltersSection = ({ rentalPosts, onSelectItem }) => {
  const rentalPostsCount = rentalPosts.list.length;
  const activeCarsCount = rentalPosts.list.filter(
    (c) => c.accepted && !c.archived
  ).length;
  const pendingCarsCount = rentalPosts.list.filter((c) => !c.accepted).length;
  const archivedCarsCount = rentalPosts.list.filter((c) => c.archived).length;

  function checkItemSelected(status) {
    return rentalPosts.selectedStatus === status;
  }

  return (
    <Container>
      <StatusFilters>
        <Item
          active={checkItemSelected("all")}
          onClick={() => onSelectItem("all")}
        >
          all ({rentalPostsCount})
        </Item>

        <Item
          active={checkItemSelected("active")}
          onClick={() => onSelectItem("active")}
        >
          active ({activeCarsCount})
        </Item>

        <Item
          active={checkItemSelected("pending")}
          onClick={() => onSelectItem("pending")}
        >
          pending ({pendingCarsCount})
        </Item>

        <Item
          active={checkItemSelected("archived")}
          onClick={() => onSelectItem("archived")}
        >
          archived ({archivedCarsCount})
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
