import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "v1/components/home/header";
import PopularBrands from "v1/components/home/popular-brands";
import AboutUs from "v1/components/home/about-us";
import WhyUs from "v1/components/home/why-us";
import Features from "v1/components/home/features";
import { routes } from "v1/client";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ term: "", type: "rent" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { term } = search;
    if (!term) return;

    let nextPage =
      search.type === "rent"
        ? routes.rentCars.navigate(search.term)
        : routes.recentlyArrivedPurchaseCars.navigate(search.term);

    navigate(nextPage);
  };

  const handleSearchChange = (event) => {
    setSearch({
      ...search,
      term: event.target.value,
    });
  };

  const onRentSelect = () => {
    if (search.type === "rent") return;
    setSearch({ ...search, type: "rent" });
  };

  const onSaleSelect = () => {
    if (search.type === "sale") return;
    setSearch({ ...search, type: "sale" });
  };

  return (
    <>
      <Header
        onSubmit={handleSubmit}
        search={search}
        onRentSelect={onRentSelect}
        onSaleSelect={onSaleSelect}
        onSearchChange={handleSearchChange}
      />
      <PopularBrands />
      <WhyUs />
      <AboutUs />
      <Features />
    </>
  );
};

export default Home;
