import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "components/common/search-page";
import RentCar from "components/car/rent";
import useQueryParams from "hooks/useQueryParams";
import Loader from "components/loader";
import { routes } from "client";
import rentApi from "api/car/rent";
import useLocale from "hooks/useLocale";

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
    price: {
      min: priceConfig.price.minValue,
      max: priceConfig.price.maxValue,
    },
    brands: [],
    colors: [],
    years: [],
  });

  useEffect(() => {
    setRentCars({ list: [], loading: true });

    rentApi.common
      .searchRentCars(searchTerm, 0)
      .then((res) => setRentCars({ list: res.data.cars, loading: false }))
      .catch((err) => setRentCars({ list: [], loading: false }));
  }, [searchTerm]);

  const handlePriceChange = (key) => (e) => {
    const isCollision =
      searchContext.price.min === searchContext.price.max ||
      searchContext.price.max < searchContext.price.min;

    if (isCollision) {
      setSearchContext({
        ...searchContext,
        price: {
          min: priceConfig.price.minValue,
          max: priceConfig.price.maxValue,
        },
      });
    } else {
      setSearchContext({
        ...searchContext,
        price: { ...searchContext.price, [key]: parseInt(e.target.value) },
      });
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
      priceConfig={priceConfig}
      onListChange={handleListChange}
      onPriceChange={handlePriceChange}
      onSearchChange={handleSearchChange}
      onSubmit={handleSubmit}
      pageTitles={[i18n("home"), i18n("arrow"), i18n("rentCars")]}
    >
      {rentCars.loading ? (
        <Loader />
      ) : (
        rentCars.list.map((rentCar) => (
          <RentCar key={rentCar._id} data={rentCar} />
        ))
      )}
    </SearchPage>
  );
};

export default RentCars;
