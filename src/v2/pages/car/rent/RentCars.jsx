import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "v2/components/common/search-page";
import RentCar from "v2/components/car/rent";
import useQueryParams from "v2/hooks/useQueryParams";
import Loader from "v2/components/loader";
import { routes } from "v2/client";
import rentApi from "v2/api/car/rent";
import useLocale from "v2/hooks/useLocale";
import EmptyList from "v2/components/common/empty-list";

const pageSize = 9;

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

  const [rentCars, setRentCars] = useState({
    list: [],
    loading: true,
    totalPages: 0,
  });
  const [searchContext, setSearchContext] = useState({
    term: searchTerm,
    brands: [],
    colors: [],
    years: [],
    pageNumber: 1,
  });
  const [price, setPrice] = useState({
    min: priceConfig.price.minValue,
    max: priceConfig.price.maxValue,
  });

  useEffect(() => {
    setRentCars({ list: [], loading: true, totalPages: 0 });

    const { brands, colors, years, pageNumber } = searchContext;
    const searchBrands = brands.map((brand) => brand._id).join(",");
    const searchColors = colors.map((color) => color.en).join(",");
    const searchYears = years.map((year) => year.value).join(",");

    rentApi.common
      .searchRentCars(
        searchTerm,
        pageNumber,
        pageSize,
        price.min,
        price.max,
        searchBrands,
        searchColors,
        searchYears
      )
      .then((res) => {
        const { rentCars, totalPages } = res.data;
        setRentCars({
          list: rentCars,
          totalPages,
          loading: false,
        });
      })
      .catch((err) => {
        setRentCars({
          list: [],
          totalPages: 0,
          loading: false,
        });
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

  const handleNextPage = () => {
    if (searchContext.pageNumber === rentCars.totalPages) return;
    setSearchContext({
      ...searchContext,
      pageNumber: searchContext.pageNumber + 1,
    });
  };

  const handlePrevPage = () => {
    if (searchContext.pageNumber === 1) return;
    setSearchContext({
      ...searchContext,
      pageNumber: searchContext.pageNumber - 1,
    });
  };

  const handleSelectPage = (pageNumber) => {
    if (searchContext.pageNumber === pageNumber) return;
    if (pageNumber === "…") return;
    setSearchContext({ ...searchContext, pageNumber });
  };

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
      currentPage={searchContext.pageNumber}
      totalPages={rentCars.totalPages}
      onNext={handleNextPage}
      onPrev={handlePrevPage}
      onSelectPage={handleSelectPage}
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
