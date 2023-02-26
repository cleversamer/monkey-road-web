import { useState } from "react";
import styled from "styled-components";
import Filter from "./filter";
import SearchBox from "../search-box";
import Location from "./Location";
import { IoClose } from "react-icons/io5";
import Pagination from "v2/components/pagination";

const SearchPage = ({
  priceConfig,
  searchContext,
  price,
  onListChange,
  onPriceChange,
  onSearchChange,
  onSubmit,
  pageTitles,
  children,
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onSelectPage,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <Container>
      <LocationContainer>
        <Location pageTitles={pageTitles} />
      </LocationContainer>

      <Content>
        <FilterContainer open={filtersOpen}>
          <Filter
            searchContext={searchContext}
            price={price}
            priceConfig={priceConfig}
            onListChange={onListChange}
            onPriceChange={onPriceChange}
          />

          <IoClose onClick={() => setFiltersOpen(false)} />
        </FilterContainer>

        <SearchContainer>
          <SearchBoxContainer>
            <SearchBox
              searchTerm={searchContext.term}
              onSearchChange={onSearchChange}
              onSubmit={onSubmit}
            />

            <FilterIcon
              src="/assets/icons/filters.svg"
              alt="filter icon"
              onClick={() => setFiltersOpen(true)}
            />
          </SearchBoxContainer>

          <SearchResultsContainer>
            <SearchResults visible={!filtersOpen}>{children}</SearchResults>

            {!!totalPages && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={onNext}
                onPrev={onPrev}
                onSelectPage={onSelectPage}
              />
            )}
          </SearchResultsContainer>
        </SearchContainer>
      </Content>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 20px;
  padding-bottom: 100px;
  background: #fff;
`;

const LocationContainer = styled.div`
  margin-left: 5vw;

  @media screen and (max-width: 680px) {
    margin-left: 0;
  }
`;

const Content = styled.section`
  display: flex;
  gap: 5vw;
`;

const FilterContainer = styled.div`
  flex: 0.25;

  > svg {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 30px;
    transition-duration: 176ms;
    cursor: pointer;
    display: none;

    :active {
      top: 19px;
      right: 19px;
      font-size: 26px;
    }

    @media screen and (max-width: 680px) {
      display: block;
    }
  }

  @media screen and (max-width: 680px) {
    flex: 0;
    display: ${({ open }) => (open ? "block" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -100px;
    z-index: 99999999999;

    > * {
      border-radius: 0;
    }
  }
`;

const SearchContainer = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media screen and (max-width: 680px) {
    flex: 1;
  }
`;

const SearchBoxContainer = styled.div`
  width: 100%;

  @media screen and (max-width: 680px) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const FilterIcon = styled.img`
  display: none;

  @media screen and (max-width: 680px) {
    display: block;
    width: 28px;
    padding: 10px;
    box-sizing: content-box;
    border-radius: 50%;
    transition-duration: 176ms;
    cursor: pointer;

    :hover {
      background-color: #eee;
      transform: scale(1.03);
    }

    :active {
      transform: scale(0.97);
    }
  }
`;

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const SearchResults = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;

  @media screen and (max-width: 680px) {
    display: ${({ visible }) => (visible ? "grid" : "none")};
  }
`;

export default SearchPage;
