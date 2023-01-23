import { useEffect, useState } from "react";
import SearchPage from "components/common/search-page";
import PurchaseCar from "components/car/purchase";
import useQueryParams from "hooks/useQueryParams";

const priceConfig = {
  price: {
    minValue: 0,
    maxValue: 500000,
  },
};

const testCars = [
  {
    _id: 1,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 1",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 2,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 2",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 3,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 4,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 5,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 6,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 7,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 8,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 9,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 10,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 11,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 12,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 13,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 14,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 15,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
];

const LatestModelsPurchaseCars = () => {
  const params = useQueryParams();
  const [purchaseCars, setPurchaseCars] = useState(testCars);
  const [searchContext, setSearchContext] = useState({
    term: params.term,
    type: "",
    price: {
      min: priceConfig.price.minValue,
      max: priceConfig.price.maxValue,
    },
    brands: [],
    colors: [],
    years: [],
  });

  useEffect(() => {
    // Fetch data
  }, []);

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

    console.log(searchContext.term);
    // Search cars///
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
      pageTitles={["home", ">", "cars for sale", ">", "Latest models"]}
    >
      {purchaseCars.map((rentCar) => (
        <PurchaseCar key={rentCar._id} data={rentCar} />
      ))}
    </SearchPage>
  );
};

export default LatestModelsPurchaseCars;
