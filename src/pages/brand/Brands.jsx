import { useState } from "react";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import PurchaseCar from "components/car/purchase";
import Brand from "components/home/popular-brands/Brand";

const testCars = [
  {
    _id: 1,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 1",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 2,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 2",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 3,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 4,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 4",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 5,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 5",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 6,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 6",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 7,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 7",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 8,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 8",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 9,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 9",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 10,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 10",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 11,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 11",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 12,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 12",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 13,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 13",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 14,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 14",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 15,
    imageURL: "https://cdn.wallpapersafari.com/38/29/mKFTMS.jpg",
    name: "Car 15",
    price: 100000,
    model: "EX",
    year: "2022",
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
  { _id: 8, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 9, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 10, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 11, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 12, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 13, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 14, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 15, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 16, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 17, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 18, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 19, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 20, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
  { _id: 21, title: "Mazda", imageURL: "/assets/images/brands/mazda.svg" },
];

const Brands = () => {
  const [context, serContext] = useState({
    similarCars: testCars,
    brands: testBrands,
  });

  return (
    <Container>
      <Location
        pageTitles={["Home", ">", "Cars for sale", ">", "Popular brands"]}
      />

      <Content>
        <GridItems>
          {context.brands.map((brand) => (
            <Brand
              key={brand._id}
              title={brand.title}
              imageURL={brand.imageURL}
            />
          ))}
        </GridItems>

        <ItemsSection type="slider" title="Similar products">
          {context.similarCars.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  padding: 60px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 90px;
`;

const GridItems = styled.div`
  padding-right: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 20px;
`;

export default Brands;
