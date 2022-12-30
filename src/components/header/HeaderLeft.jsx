import styled from "styled-components";
import HeaderBrands from "./HeaderBrands";
import HeaderSearch from "./HeaderSearch";

const HeaderLeft = () => {
  return (
    <Container>
      <HeaderTitle>
        High-quality cars, reasonable prices, and within everyone's reach
      </HeaderTitle>

      <HeaderSearch />

      <HeaderBrands />
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const HeaderTitle = styled.h1`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
`;

export default HeaderLeft;