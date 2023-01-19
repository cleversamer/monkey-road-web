import styled from "styled-components";
import SearchBox from "../../common/search-box";
import { IoIosArrowForward } from "react-icons/io";

const HeaderLeft = ({
  search,
  placeholder,
  onSubmit,
  onRentSelect,
  onSaleSelect,
  onSearchChange,
}) => {
  return (
    <Container>
      <HeaderTitle>
        High-quality cars, reasonable prices, and within everyone's reach
      </HeaderTitle>

      <SearchContainer>
        <HeaderSearchFilters>
          <HeaderSearchFilter onClick={onRentSelect}>
            {search.type === "rent" && <IoIosArrowForward />} Cars For Rent
          </HeaderSearchFilter>

          <HeaderSearchFilter onClick={onSaleSelect}>
            {search.type === "sale" && <IoIosArrowForward />} Cars For Sale
          </HeaderSearchFilter>
        </HeaderSearchFilters>

        <SearchBox
          onSearchChange={onSearchChange}
          searchTerm={search.term}
          placeholder={placeholder}
          onSubmit={onSubmit}
        />
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 820px) {
    width: 100%;
    justify-content: center;
  }
`;

const HeaderTitle = styled.h1`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  color: #fff;

  @media screen and (max-width: 480px) {
    font-size: 21px;
  }
`;

const SearchContainer = styled.div`
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

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

export default HeaderLeft;