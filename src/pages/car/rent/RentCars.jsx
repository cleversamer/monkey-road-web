import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "components/common/search-page";
import RentCar from "components/car/rent";
import useQueryParams from "hooks/useQueryParams";
import Loader from "components/loader";
import { routes } from "client";
import rentApi from "api/car/rent";
import useLocale from "hooks/useLocale";
import EmptyList from "components/common/empty-list";

const priceConfig = {
  price: {
    minValue: 200,
    maxValue: 500000,
  },
};

const RentCars = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const searchTerm = useQueryParams()?.term?.trim() || "Latest cars";

  const [rentCars, setRentCars] = useState({ list: [], loading: true });
  const [searchContext, setSearchContext] = useState({
    term: searchTerm,
    brands: [],
    colors: [],
    years: [],
  });
  const [price, setPrice] = useState({
    min: priceConfig.price.minValue,
    max: priceConfig.price.maxValue,
  });

  useEffect(() => {
    setRentCars({ list: [], loading: true });

    const { brands, colors, years } = searchContext;
    const searchBrands = brands.map((brand) => brand._id).join(",");
    const searchColors = colors.map((color) => color.en).join(",");
    const searchYears = years.map((year) => year.value).join(",");

    rentApi.common
      .searchRentCars(
        searchTerm,
        0,
        price.min,
        price.max,
        searchBrands,
        searchColors,
        searchYears
      )
      .then((res) => setRentCars({ list: res.data.cars, loading: false }))
      .catch((err) => {
        setRentCars({ list: [], loading: false });
      });
  }, [searchTerm, searchContext]);

  const handlePriceChange = (key) => (e) => {
    const isCollision = price.min === price.max || price.max < price.min;

    if (isCollision) {
      setPrice({
        min: priceConfig.price.minValue,
        max: priceConfig.price.maxValue,
      });
    } else {
      setPrice({ ...price, [key]: parseInt(e.target.value) });
    }
  };

  const handleListChange = (listKey) => (listValue) =>
    setSearchContext({ ...searchContext, [listKey]: [...listValue] });

  const handleSearchChange = (e) =>
    setSearchContext({ ...searchContext, term: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { term } = searchContext;
    if (!term) return;

    navigate(routes.rentCars.navigate(term));
  };

  return (
    <SearchPage
      cars={rentCars}
      searchContext={searchContext}
      price={price}
      priceConfig={priceConfig}
      onListChange={handleListChange}
      onPriceChange={handlePriceChange}
      onSearchChange={handleSearchChange}
      onSubmit={handleSubmit}
      pageTitles={[i18n("home"), i18n("arrow"), i18n("rentCars")]}
    >
      {rentCars.loading ? (
        <Loader />
      ) : rentCars.list.length ? (
        rentCars.list.map((rentCar) => (
          <RentCar key={rentCar._id} data={rentCar} />
        ))
      ) : (
        <EmptyList
          imageURL="/assets/images/empty-1.svg"
          title={i18n("noSearchResults")}
        />
      )}
    </SearchPage>
  );
};

export default RentCars;
