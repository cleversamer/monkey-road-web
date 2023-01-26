import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ItemsSection from "components/common/items-section";
import RentCar from "components/car/rent";
import PurchaseCar from "components/car/purchase";
import EmptyList from "components/common/empty-list";
import { routes } from "client";

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

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(testCars);
  const [latestCars, setLatestCars] = useState({
    forRent: testCars,
    forSale: testCars,
  });

  useEffect(() => {
    // fetch favorites
  }, []);

  const handleGoShopping = () =>
    navigate(routes.latestPurchaseCarModels.navigate());

  return (
    <Container>
      <Location pageTitles={["home", ">", "favorites"]} />

      <FavoritesContainer>
        {favorites.length ? (
          <FavoritesList>
            {favorites.map((car) => (
              <PurchaseCar key={car._id} data={car} />
            ))}
          </FavoritesList>
        ) : (
          <EmptyList
            title="It's empty here..."
            buttonTitle="go shopping"
            imageURL="/assets/images/empty-1.svg"
            onClick={handleGoShopping}
          />
        )}
      </FavoritesContainer>

      <LatestCarsContainer>
        <ItemsSection type="slider" title="latest cars for rent">
          {latestCars.forRent.map((car) => (
            <RentCar key={car._id} data={car} />
          ))}
        </ItemsSection>

        <ItemsSection type="slider" title="latest cars for sale">
          {latestCars.forSale.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>
      </LatestCarsContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;
`;

const FavoritesContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 80px;
`;

const FavoritesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
`;

const LatestCarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default Favorites;
