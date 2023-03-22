import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const FiltersSection = ({ rentalPosts, onSelectItem }) => {
  const { i18n, lang } = useLocale();

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
      <StatusFilters lang={lang}>
        <Item
          active={checkItemSelected("all")}
          onClick={() => onSelectItem("all")}
        >
          {i18n("all")} ({rentalPostsCount})
        </Item>

        <Item
          active={checkItemSelected("active")}
          onClick={() => onSelectItem("active")}
        >
          {i18n("active")} ({activeCarsCount})
        </Item>

        <Item
          active={checkItemSelected("pending")}
          onClick={() => onSelectItem("pending")}
        >
          {i18n("pending")} ({pendingCarsCount})
        </Item>

        <Item
          active={checkItemSelected("archived")}
          onClick={() => onSelectItem("archived")}
        >
          {i18n("archived")} ({archivedCarsCount})
        </Item>
      </StatusFilters>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
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
  margin-bottom: 10px;
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
