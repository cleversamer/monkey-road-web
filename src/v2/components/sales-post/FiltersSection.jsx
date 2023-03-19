import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const FiltersSection = ({ salesPosts, onSelectItem }) => {
  const { i18n } = useLocale();

  const salesPostsCount = salesPosts.list.length;
  const soldCarsCount = salesPosts.list.filter((p) => p.sold && p.paid).length;
  const notSoldCarsCount = salesPosts.list.filter(
    (p) => !p.sold && p.paid
  ).length;
  const unpaidCarsCount = salesPosts.list.filter((p) => !p.paid).length;

  function checkItemSelected(status) {
    return salesPosts.selectedStatus === status;
  }

  return (
    <Container>
      <StatusFilters>
        <Item
          active={checkItemSelected("all")}
          onClick={() => onSelectItem("all")}
        >
          {i18n("all")} ({salesPostsCount})
        </Item>

        <Item
          active={checkItemSelected("sold")}
          onClick={() => onSelectItem("sold")}
        >
          {i18n("sold")} ({soldCarsCount})
        </Item>

        <Item
          active={checkItemSelected("not sold")}
          onClick={() => onSelectItem("not sold")}
        >
          {i18n("notSold")} ({notSoldCarsCount})
        </Item>

        <Item
          active={checkItemSelected("unpaid")}
          onClick={() => onSelectItem("unpaid")}
        >
          {i18n("unpaid")} ({unpaidCarsCount})
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
