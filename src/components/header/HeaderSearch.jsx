import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

const HeaderSearch = () => {
  return (
    <Container>
      <HeaderSearchFilters>
        <HeaderSearchFilter>
          <IoIosArrowForward /> keyword
        </HeaderSearchFilter>

        <HeaderSearchFilter>make/model</HeaderSearchFilter>

        <HeaderSearchFilter>price</HeaderSearchFilter>
      </HeaderSearchFilters>

      <HeaderSearchBox>
        <HeaderSearchInput placeholder="Search by keyword..." />

        <HeaderSearchIconContainer>
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
  text-transform: uppercase;
  cursor: pointer;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }

  svg {
    margin-right: 5px;
    color: #fe7777;
  }
`;

const HeaderSearchBox = styled.div`
  width: 400px;
  position: relative;
  height: 40px;
`;

const HeaderSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 1px solid #fe7777;
  padding-left: 20px;
  padding-right: 50px;
  outline: none;
`;

const HeaderSearchIconContainer = styled.span`
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
