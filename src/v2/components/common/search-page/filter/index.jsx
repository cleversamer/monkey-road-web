import styled from "styled-components";
import FilterSection from "./FilterSection";
import PriceFilter from "./PriceFilter";
import BrandsFilter from "./BrandsFilter";
import ColorsFilter from "./ColorsFilter";
import YearsFilter from "./YearsFilter";
import useLocale from "v2/hooks/useLocale";

const Filter = ({
  priceConfig,
  searchContext,
  price,
  onListChange,
  onPriceChange,
}) => {
  const { i18n, lang } = useLocale();

  return (
    <Container lang={lang}>
      <Title>{i18n("filters")}</Title>

      <FilterSection title={i18n("price")}>
        <PriceFilter
          min={price.min}
          minValue={priceConfig.price.minValue}
          max={price.max}
          maxValue={priceConfig.price.maxValue}
          onChange={onPriceChange}
        />
      </FilterSection>

      <FilterSection title={i18n("brands")} withIcon={true}>
        <BrandsFilter
          selectedBrands={searchContext.brands}
          onChange={onListChange("brands")}
        />
      </FilterSection>

      <FilterSection title={i18n("colors")} withIcon={true}>
        <ColorsFilter
          selectedColors={searchContext.colors}
          onChange={onListChange("colors")}
        />
      </FilterSection>

      <FilterSection title={i18n("yearModel")} withIcon={true}>
        <YearsFilter
          selectedYears={searchContext.years}
          onChange={onListChange("years")}
        />
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
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.25);
`;

const Title = styled.h3`
  color: #fe7777;
  margin-bottom: 15px;
  padding: 0 20px;
`;

export default Filter;
