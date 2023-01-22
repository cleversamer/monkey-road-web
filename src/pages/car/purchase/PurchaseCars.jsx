import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import PurchaseCar from "components/car/purchase";
import Brand from "components/home/popular-brands/Brand";
import { routes } from "client";

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
    name: "Car 4",
    price: 100000,
    model: "EX",
    year: "2022",
    phoneNumber: "+972597367603",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
];

const testBrands = [
  { _id: 1, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 2, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 3, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 4, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 5, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 6, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 7, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
];

const PurchaseCars = () => {
  const navigate = useNavigate();
  const [context, setContext] = useState({
    recentlyArrivedCars: testCars,
    popularBrands: testBrands,
    latestModelsCars: testCars,
    bestSellerCars: testCars,
  });

  useEffect(() => {
    // fetch recentlyArrivedCars
    // fetch popularBrands
    // fetch latestModelsCars
    // fetch bestSellerCars
  }, []);

  return (
    <Container>
      <Location pageTitles={["Home", ">", "Cars for sale"]} />

      <SectionsContainer>
        <ItemsSection
          type="section"
          title="Recently arrived"
          onSeeMore={() =>
            navigate(routes.recentlyArrivedPurchaseCars.navigate())
          }
        >
          {context.recentlyArrivedCars.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>

        <ItemsSection
          type="section"
          brands
          title="Popular brands"
          onSeeMore={() => navigate(routes.popularBrands.navigate())}
        >
          {context.popularBrands.map((brand) => (
            <Brand
              key={brand._id}
              title={brand.title}
              imageURL={brand.imageURL}
            />
          ))}
        </ItemsSection>

        <ItemsSection
          type="section"
          title="Latest models"
          onSeeMore={() => navigate(routes.latestPurchaseCarModels.navigate())}
        >
          {context.latestModelsCars.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>

        <ItemsSection
          type="section"
          title="Best seller"
          onSeeMore={() => navigate(routes.bestPurchaseCarSellers.navigate())}
        >
          {context.bestSellerCars.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>
      </SectionsContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export default PurchaseCars;
