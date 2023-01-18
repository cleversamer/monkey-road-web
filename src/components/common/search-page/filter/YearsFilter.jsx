import { useState } from "react";
import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import ViewMore from "./ViewMore";

const YearsFilter = ({ onChange }) => {
  const [years, setYears] = useState([
    { _id: 1, title: "2023", selected: false },
    { _id: 2, title: "2022", selected: false },
    { _id: 3, title: "2021", selected: false },
    { _id: 4, title: "2020", selected: false },
    { _id: 5, title: "2019", selected: false },
    { _id: 6, title: "2018", selected: false },
    { _id: 7, title: "2017", selected: false },
  ]);

  const handleChange = (e, year) => {
    const yearsList = [...years];
    const yearIndex = yearsList.findIndex((item) => item._id === year._id);
    yearsList[yearIndex].selected = e.target.checked;
    setYears(yearsList);

    const selectedYears = years.filter((item) => item.selected);
    onChange(selectedYears);
  };

  const handleViewMore = () => {};

  return (
    <Container>
      {years.map((year) => (
        <CustomInput
          key={year._id}
          id={year._id}
          type="checkbox"
          title={year.title}
          checked={year.selected}
          onChange={(e) => handleChange(e, year)}
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
