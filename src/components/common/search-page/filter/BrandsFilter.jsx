import { useState } from "react";
import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import ViewMore from "./ViewMore";

const BrandsFilter = ({ onChange }) => {
  const [brands, setBrands] = useState([
    { _id: 1, title: "Brand 1", selected: false },
    { _id: 2, title: "Brand 2", selected: false },
    { _id: 3, title: "Brand 3", selected: false },
    { _id: 4, title: "Brand 4", selected: false },
  ]);

  const handleChange = (e, brand) => {
    const brandsList = [...brands];
    const brandIndex = brandsList.findIndex((item) => item._id === brand._id);
    brandsList[brandIndex].selected = e.target.checked;
    setBrands(brandsList);

    const selectedBrands = brands.filter((item) => item.selected);
    onChange(selectedBrands);
  };

  const handleViewMore = () => {};

  return (
    <Container>
      {brands.map((brand) => (
        <CustomInput
          key={brand._id}
          id={brand._id}
          type="checkbox"
          title={brand.title}
          checked={brand.selected}
          onChange={(e) => handleChange(e, brand)}
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

export default BrandsFilter;
