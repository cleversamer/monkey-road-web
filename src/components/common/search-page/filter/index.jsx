import styled from "styled-components";
import FilterSection from "./FilterSection";
import PriceFilter from "./PriceFilter";
import BrandsFilter from "./BrandsFilter";
import ColorsFilter from "./ColorsFilter";
import YearsFilter from "./YearsFilter";

const Filter = ({
  priceConfig,
  searchContext,
  onListChange,
  onPriceChange,
}) => {
  return (
    <Container>
      <Title>Filters</Title>

      <FilterSection title="Price">
        <PriceFilter
          min={searchContext.price.min}
          minValue={priceConfig.price.minValue}
          max={searchContext.price.max}
          maxValue={priceConfig.price.maxValue}
          onChange={onPriceChange}
        />
      </FilterSection>

      <FilterSection title="Brands" withIcon={true}>
        <BrandsFilter onChange={onListChange("brands")} />
      </FilterSection>

      <FilterSection title="Colors" withIcon={true}>
        <ColorsFilter onChange={onListChange("colors")} />
      </FilterSection>

      <FilterSection title="Year Models" withIcon={true}>
        <YearsFilter onChange={onListChange("years")} />
      </FilterSection>
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 0;
`;

const Title = styled.h3`
  color: #fe7777;
  margin-bottom: 15px;
  padding: 0 20px;
`;

export default Filter;
