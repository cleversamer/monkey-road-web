import styled from "styled-components";

const Pagination = ({
  totalPages,
  currentPage,
  onNext,
  onPrev,
  onSelectPage,
}) => {
  function paginate() {
    let prev = currentPage === 1 ? null : currentPage - 1;
    let next = currentPage === totalPages ? null : currentPage + 1;
    let items = [1];

    if (currentPage === 1 && totalPages === 1) {
      return { current: currentPage, prev, next, items };
    }

    if (currentPage > 4) {
      items.push("…");
    }

    let r = 2;
    let r1 = currentPage - r;
    let r2 = currentPage + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(totalPages, r2); i++) {
      items.push(i);
    }

    if (r2 + 1 < totalPages) {
      items.push("…");
    }

    if (r2 < totalPages) {
      items.push(totalPages);
    }

    return {
      current: currentPage,
      prev,
      next,
      items,
    };
  }

  return (
    <Container>
      <Item onClick={onPrev}>&lt;</Item>

      {paginate().items.map((page, index) => (
        <Item
          key={page + index}
          selected={page === currentPage}
          onClick={() => onSelectPage(page)}
        >
          {page}
        </Item>
      ))}

      <Item onClick={onNext}>&gt;</Item>
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-top: 30px;
`;

const Item = styled.li`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 3px 1px rgba(51, 51, 51, 0.2);
  border-radius: 3px;
  background-color: ${({ selected }) => (selected ? "#fe7777" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#303030")};
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.95);
  }
`;

export default Pagination;
