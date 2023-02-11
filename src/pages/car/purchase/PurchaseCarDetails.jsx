import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Gallery from "components/car-details/Gallery";
import Details from "components/car-details/purchase";
import ItemsSection from "components/common/items-section";
import PurchaseCar from "components/car/purchase";
import purchaseApi from "api/car/purchase";
import useLocale from "hooks/useLocale";

const PurchaseCarDetails = () => {
  const { i18n, lang } = useLocale();
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);

  useEffect(() => {
    // fetch car details
    purchaseApi.common
      .getPurchaseCarDetails(carId)
      .then((res) => setCar(res.data));

    // fetch similar products
  }, []);

  const handleRentCar = () => {};

  if (!car) return null;

  return (
    <Container>
      <Content>
        <Gallery images={car.photos} />
        <Details car={car} />
      </Content>

      <DetailsSection>
        <DetailsTitle>{i18n("itemOverview")}</DetailsTitle>

        <DetailsList>
          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/kmph.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>
              {car.kiloPerHour} {i18n("kmph")}
            </ItemTitle>
          </DetailsItem>

          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/automatic.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>{car.vehicleType[lang]}</ItemTitle>
          </DetailsItem>

          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/diesel.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>{car.fuelType[lang]}</ItemTitle>
          </DetailsItem>

          <DetailsItem>
            <ItemImage
              src="/assets/images/purchase-car/seats.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>
              {car.noOfSeats} {i18n("seats")}
            </ItemTitle>
          </DetailsItem>
        </DetailsList>
      </DetailsSection>

      {!!similarCars.length && (
        <ItemsSection type="slider" title={i18n("similarProducts")}>
          {similarCars.map((car) => (
            <PurchaseCar key={car._id} data={car} />
          ))}
        </ItemsSection>
      )}
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
  /* gap: 40px; */

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  max-height: max-content;

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

const ItemTitle = styled.h5`
  text-transform: capitalize;
`;

export default PurchaseCarDetails;
