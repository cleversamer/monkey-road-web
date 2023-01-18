import styled from "styled-components";
import Filter from "./filter";
import SearchBox from "../search-box";
import Location from "./Location";

const SearchPage = ({
  priceConfig,
  searchContext,
  onListChange,
  onPriceChange,
  onSearchChange,
  onSubmit,
  pageTitles,
  children,
}) => {
  return (
    <Container>
      <LocationContainer>
        <Location pageTitles={pageTitles} />
      </LocationContainer>

      <Content>
        <FilterContainer>
          <Filter
            searchContext={searchContext}
            priceConfig={priceConfig}
            onListChange={onListChange}
            onPriceChange={onPriceChange}
          />
        </FilterContainer>

        <SearchContainer>
          <SearchBox onSearchChange={onSearchChange} onSubmit={onSubmit} />
          <SearchResults>{children}</SearchResults>
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
  background: #fafafa;
`;

const LocationContainer = styled.div`
  margin-left: 5vw;
`;

const Content = styled.section`
  display: flex;
  gap: 5vw;
`;

const FilterContainer = styled.div`
  flex: 0.25;
`;

const SearchContainer = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SearchResults = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

export default SearchPage;
