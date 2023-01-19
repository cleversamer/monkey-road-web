import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/home/header";
import PopularBrands from "components/home/popular-brands";
import AboutUs from "components/home/about-us";
import WhyUs from "components/home/why-us";
import Features from "components/home/features";
import { ROUTES } from "client";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ term: "", type: "rent" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { term } = search;
    if (!term) return;

    let nextPage =
      search.type === "rent"
        ? ROUTES.CLIENT.RENT_CARS
        : ROUTES.CLIENT.PURCHASE_CARS;

    nextPage += `?term=${search.term}`;
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
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: #fff;
`;

export default Home;
