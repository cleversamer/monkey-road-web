import { useState } from "react";
import styled from "styled-components";
import CustomInput from "v1/components/common/custom-input";
import ViewMore from "./ViewMore";
import carsData from "v1/static/carsData";

const YearsFilter = ({ selectedYears, onChange }) => {
  const [years, setYears] = useState(
    carsData.years.map((year) => ({ value: year, selected: false }))
  );

  const handleChange = (yearIndex) => {
    const yearsList = [...years];
    yearsList[yearIndex].selected = !yearsList[yearIndex].selected;
    setYears(yearsList);

    const selectedColors = years.filter((item) => item.selected);
    onChange(selectedColors);
  };

  const handleViewMore = () => {};

  const checkYearSelected = (year) => {
    const index = selectedYears.findIndex((y) => y.value === year.value);
    return index >= 0;
  };

  return (
    <Container>
      {years.map((year, index) => (
        <CustomInput
          key={year.value + index}
          id={year.value}
          type="checkbox"
          title={year.value}
          value={checkYearSelected(year)}
          onChange={() => handleChange(index)}
        />
      ))}

      <ViewMore onClick={handleViewMore} />
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 10px;

  label {
    font-size: 15px;
    font-weight: 500;
  }
`;

export default YearsFilter;
