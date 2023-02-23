import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import ViewMore from "./ViewMore";
import brandsApi from "v2/api/car/brands";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";

const BrandsFilter = ({ selectedBrands, onChange }) => {
  const { lang } = useLocale();
  const [brands, setBrands] = useState({ loading: true, list: [] });

  useEffect(() => {
    brandsApi.common
      .getPopularBrands(0)
      .then((res) => {
        setBrands({
          loading: false,
          list: res.data.brands,
        });
      })
      .catch((err) => setBrands({ loading: false, list: [] }));
  }, []);

  const handleChange = (e, brand) => {
    const brandsList = [...brands.list];
    const brandIndex = brandsList.findIndex((item) => item._id === brand._id);
    brandsList[brandIndex].selected = e.target.checked;
    setBrands({ ...brands, list: brandsList });

    const selectedBrands = brands.list.filter((item) => item.selected);
    onChange(selectedBrands);
  };

  const handleViewMore = () => {};

  const checkBrandSelected = (brand) => {
    const index = selectedBrands.findIndex((b) => b._id === brand._id);
    return index >= 0;
  };

  return (
    <Container>
      {brands.loading ? (
        <Loader />
      ) : (
        brands.list.map((brand) => (
          <CustomInput
            key={brand._id}
            id={brand._id}
            type="checkbox"
            title={brand.name[lang]}
            value={checkBrandSelected(brand)}
            onChange={(e) => handleChange(e, brand)}
          />
        ))
      )}

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
