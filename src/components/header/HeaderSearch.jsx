import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

const HeaderSearch = () => {
  const [search, setSearch] = useState({ term: "", type: "rent" });

  const handleSearchChange = (event) => {
    setSearch({
      ...search,
      term: event.target.value,
    });
  };

  const onRentSelect = () => {
    if (search.type === "rent") return;
    setSearch({ ...search, type: "rent" });
  };

  const onSaleSelect = () => {
    if (search.type === "sale") return;
    setSearch({ ...search, type: "sale" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { term } = search;

    if (!term) return;

    setSearch({ ...search, term: "" });

    // TODO: navigate to search results
  };

  return (
    <Container>
      <HeaderSearchFilters>
        <HeaderSearchFilter onClick={onRentSelect}>
          {search.type === "rent" && <IoIosArrowForward />} Cars For Rent
        </HeaderSearchFilter>

        <HeaderSearchFilter onClick={onSaleSelect}>
          {search.type === "sale" && <IoIosArrowForward />} Cars For Sale
        </HeaderSearchFilter>
      </HeaderSearchFilters>

      <HeaderSearchBox onSubmit={handleSubmit}>
        <HeaderSearchInput
          value={search.term}
          onChange={handleSearchChange}
          placeholder="Find your favorite car..."
        />

        <HeaderSearchIconContainer type="submit">
          <HeaderSearchIcon src="/assets/icons/search.svg" alt="search icon" />
        </HeaderSearchIconContainer>
      </HeaderSearchBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderSearchFilters = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const HeaderSearchFilter = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  cursor: pointer;
  transition-duration: 176ms;
  color: #fff;

  :hover {
    color: #fe7777;
  }

  svg {
    margin-right: 5px;
    fill: #fe7777;
    font-size: 18px;
  }
`;

const HeaderSearchBox = styled.form`
  width: 400px;
  position: relative;
  height: 40px;
`;

const HeaderSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 1px solid #fff;
  padding-left: 20px;
  padding-right: 50px;
  outline: none;
`;

const HeaderSearchIconContainer = styled.button`
  background-color: #fe7777;
  border-radius: 200px;
  height: 100%;
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
`;

const HeaderSearchIcon = styled.img`
  width: 20px;

  :hover {
    transform: scale(0.97);
  }

  :active {
    transform: scale(0.95);
  }
`;

export default HeaderSearch;
