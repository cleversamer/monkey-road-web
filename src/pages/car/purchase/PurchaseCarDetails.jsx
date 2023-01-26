import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Gallery from "components/car-details/Gallery";
import Details from "components/car-details/purchase";
import ItemsSection from "components/common/items-section";
import PurchaseCar from "components/car/purchase";

const testCars = [
  {
    _id: 1,
    imageURL: "/assets/images/car.jpg",
    name: "Car 1",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 2,
    imageURL: "/assets/images/car.jpg",
    name: "Car 2",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 3,
    imageURL: "/assets/images/car.jpg",
    name: "Car 3",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 4,
    imageURL: "/assets/images/car.jpg",
    name: "Car 4",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 5,
    imageURL: "/assets/images/car.jpg",
    name: "Car 5",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 6,
    imageURL: "/assets/images/car.jpg",
    name: "Car 6",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 7,
    imageURL: "/assets/images/car.jpg",
    name: "Car 7",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 8,
    imageURL: "/assets/images/car.jpg",
    name: "Car 8",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 9,
    imageURL: "/assets/images/car.jpg",
    name: "Car 9",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 10,
    imageURL: "/assets/images/car.jpg",
    name: "Car 10",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 11,
    imageURL: "/assets/images/car.jpg",
    name: "Car 11",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 12,
    imageURL: "/assets/images/car.jpg",
    name: "Car 12",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 13,
    imageURL: "/assets/images/car.jpg",
    name: "Car 13",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 14,
    imageURL: "/assets/images/car.jpg",
    name: "Car 14",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
  {
    _id: 15,
    imageURL: "/assets/images/car.jpg",
    name: "Car 15",
    price: 100000,
    model: "EX",
    year: "2022",
    brand: [{ _id: 1, name: { en: "Toyota", ar: "تويوتا" } }],
  },
];

const PurchaseCarDetails = () => {
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
        <Details />
      </Content>

      <DetailsSection>
        <DetailsTitle>Item overview</DetailsTitle>

        <DetailsList>
          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/kmph.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>900 Km</ItemTitle>
          </DetailsItem>

          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/automatic.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>900 Km</ItemTitle>
          </DetailsItem>

          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/diesel.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>900 Km</ItemTitle>
          </DetailsItem>

          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/seats.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>900 Km</ItemTitle>
          </DetailsItem>
        </DetailsList>
      </DetailsSection>

      <ItemsSection type="slider" title="Similar products">
        {similarCars.map((car) => (
          <PurchaseCar key={car._id} data={car} />
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
  gap: 100px;

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

const DetailsSection = styled.section`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: -70px;

  @media screen and (max-width: 540px) {
    gap: 30px;
  }
`;

const DetailsTitle = styled.h4`
  @media screen and (max-width: 540px) {
    margin: 0 auto;
  }
`;

const DetailsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 20px;
  width: 100%;
  max-width: 540px;

  @media screen and (max-width: 540px) {
    margin: 0 auto;
    justify-items: center;
  }
`;

const DetailsItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 100px;
  background-color: #fff;
  box-shadow: 0px 1px 3px 3px rgba(254, 119, 119, 0.35);
`;

const ItemImage = styled.img``;

const ItemTitle = styled.h5``;

export default PurchaseCarDetails;
