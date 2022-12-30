import styled from "styled-components";

const HeaderBrands = () => {
  return (
    <Container>
      <PopularBrandsTitle>Popular brands</PopularBrandsTitle>

      <PopularBrandsList>
        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/honda.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/mazda.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/mini.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/hyundai.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/nissan.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/audi.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/lexus.svg" alt="" />
        </PopularBrandItem>

        <PopularBrandItem>
          <PopularBrandImage src="/assets/images/brands/citroen.svg" alt="" />
        </PopularBrandItem>
      </PopularBrandsList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PopularBrandsTitle = styled.h2`
  margin-bottom: 10px;
  text-transform: capitalize;
`;

const PopularBrandsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 110px);
  grid-row-gap: 20px;
`;

const PopularBrandItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition-duration: 176ms;

  :hover {
    transform: scale(0.97);
  }

  :active {
    transform: scale(0.95);
  }
`;

const PopularBrandImage = styled.img`
  width: 60px;
  object-fit: contain;
`;

export default HeaderBrands;
