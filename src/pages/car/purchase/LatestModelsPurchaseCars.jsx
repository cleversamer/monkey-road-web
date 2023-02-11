import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "components/common/search-page";
import PurchaseCar from "components/car/purchase";
import useQueryParams from "hooks/useQueryParams";
import purchaseApi from "api/car/purchase";
import { routes } from "client";
import Loader from "components/loader";
import useLocale from "hooks/useLocale";

const priceConfig = {
  price: {
    minValue: 0,
    maxValue: 500000,
  },
};

const LatestModelsPurchaseCars = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const searchTerm = useQueryParams()?.term?.trim() || "Latest cars";

  const [purchaseCars, setPurchaseCars] = useState({ loading: true, list: [] });
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
    setPurchaseCars({ list: [], loading: true });

    purchaseApi.common
      .searchPurchaseCars(searchTerm, 0)
      .then((res) => setPurchaseCars({ list: res.data.cars, loading: false }))
      .catch((err) => {});
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

    navigate(routes.bestPurchaseCarSellers.navigate(term));
  };

  return (
    <SearchPage
      cars={purchaseCars}
      searchContext={searchContext}
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
        i18n("latestModels"),
      ]}
    >
      {purchaseCars.loading ? (
        <Loader />
      ) : (
        purchaseCars.list.map((rentCar) => (
          <PurchaseCar key={rentCar._id} data={rentCar} />
        ))
      )}
    </SearchPage>
  );
};

export default LatestModelsPurchaseCars;
