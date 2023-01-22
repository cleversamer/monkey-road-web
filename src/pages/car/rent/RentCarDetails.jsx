import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Gallery from "components/car-details/Gallery";
import Details from "components/car-details/rent";
import ItemsSection from "components/common/items-section";
import RentCar from "components/car/rent";

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

const RentCarDetails = () => {
  const { carId } = useParams();
  const [similarCars, setSimilarCars] = useState(testCars);

  useEffect(() => {
    // fetch car details
    // fetch similar products
  }, []);

  const handleRentCar = () => {};

  return (
    <Container>
      <Content>
        <Gallery />
        <Details onRent={handleRentCar} />
      </Content>

      <ItemsSection type="slider" title="Similar products">
        {similarCars.map((car) => (
          <RentCar key={car._id} data={car} />
        ))}
      </ItemsSection>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  padding: 60px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 40px;

  @media screen and (max-width: 870px) {
    flex-direction: column;
  }
`;

export default RentCarDetails;
