import styled from "styled-components";
import SearchBox from "../../common/search-box";
import { IoIosArrowForward } from "react-icons/io";
import useLocale from "v2/hooks/useLocale";

const HeaderLeft = ({
  search,
  placeholder,
  onSubmit,
  onRentSelect,
  onSaleSelect,
  onSearchChange,
}) => {
  const { i18n, lang } = useLocale();

  return (
    <Container>
      <HeaderTitle lang={lang}>{i18n("headerTitle")}</HeaderTitle>

      <SearchContainer>
        <HeaderSearchFilters lang={lang}>
          <HeaderSearchFilter onClick={onRentSelect}>
            {search.type === "rent" && <IoIosArrowForward />}
            {i18n("rentCars")}
          </HeaderSearchFilter>

          <HeaderSearchFilter onClick={onSaleSelect}>
            {search.type === "sale" && <IoIosArrowForward />}
            {i18n("purchaseCars")}
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
  margin-left: 20px;

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
  max-width: 420px;
  align-self: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};

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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
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
