import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import ViewMore from "./ViewMore";
import brandsApi from "v2/api/car/brands";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";

const pageSize = 4;

const BrandsFilter = ({ selectedBrands, onChange }) => {
  const { lang } = useLocale();
  const [brands, setBrands] = useState({ loading: true, list: [], end: false });
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    brandsApi.common
      .getPopularBrands(lastPage, pageSize)
      .then((res) => {
        setBrands({
          loading: false,
          list: [...brands.list, ...res.data.brands],
          end: res.data.totalPages === lastPage,
        });
      })
      .catch((err) => setBrands({ loading: false, list: brands.list }));
  }, [lastPage]);

  const handleChange = (e, brand) => {
    const brandsList = [...brands.list];
    const brandIndex = brandsList.findIndex((item) => item._id === brand._id);
    brandsList[brandIndex].selected = e.target.checked;
    setBrands({ ...brands, list: brandsList });

    const selectedBrands = brands.list.filter((item) => item.selected);
    onChange(selectedBrands);
  };

  const handleViewMore = () => {
    setBrands({ ...brands, loading: true });
    setLastPage(lastPage + 1);
  };

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

      {!brands.end && <ViewMore onClick={handleViewMore} />}
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
