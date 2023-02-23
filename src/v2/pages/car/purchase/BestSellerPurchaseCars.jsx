import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "v2/components/common/search-page";
import PurchaseCar from "v2/components/car/purchase";
import useQueryParams from "v2/hooks/useQueryParams";
import purchaseApi from "v2/api/car/purchase";
import { routes } from "v2/client";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";
import EmptyList from "v2/components/common/empty-list";

const priceConfig = {
  price: {
    minValue: 0,
    maxValue: 500000,
  },
};

const BestSellerPurchaseCars = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const searchTerm = useQueryParams()?.term?.trim() || "Latest cars";

  const [purchaseCars, setPurchaseCars] = useState({ loading: true, list: [] });
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
    setPurchaseCars({ list: [], loading: true });

    const { brands, colors, years } = searchContext;
    const searchBrands = brands.map((brand) => brand._id).join(",");
    const searchColors = colors.map((color) => color.en).join(",");
    const searchYears = years.map((year) => year.value).join(",");

    purchaseApi.common
      .searchPurchaseCars(
        searchTerm,
        0,
        price.min,
        price.max,
        searchBrands,
        searchColors,
        searchYears
      )
      .then((res) => setPurchaseCars({ list: res.data.cars, loading: false }))
      .catch((err) => setPurchaseCars({ list: [], loading: false }));
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

    navigate(routes.bestPurchaseCarSellers.navigate(term));
  };

  return (
    <SearchPage
      cars={purchaseCars}
      searchContext={searchContext}
      price={price}
      priceConfig={priceConfig}
      onListChange={handleListChange}
      onPriceChange={handlePriceChange}
      onSearchChange={handleSearchChange}
      onSubmit={handleSubmit}
      pageTitles={[
        i18n("home"),
        i18n("arrow"),
        i18n("purchaseCars"),
        i18n("arrow"),
        i18n("bestSeller"),
      ]}
    >
      {purchaseCars.loading ? (
        <Loader />
      ) : purchaseCars.list.length ? (
        purchaseCars.list.map((rentCar) => (
          <PurchaseCar key={rentCar._id} data={rentCar} />
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

export default BestSellerPurchaseCars;
