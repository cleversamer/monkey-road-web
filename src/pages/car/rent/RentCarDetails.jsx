import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
import Gallery from "components/car-details/Gallery";
import ItemsSection from "components/common/items-section";
import RentCar from "components/car/rent";
import Details1 from "./details/Details1";
import Details2 from "./details/Details2";
import Details3 from "./details/Details3";
import rentApi from "api/car/rent";
import useLocale from "hooks/useLocale";

const RentCarDetails = () => {
  const { i18n } = useLocale();
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [pages, setPages] = useState({ count: 3, current: 1 });
  const [similarCars, setSimilarCars] = useState([]);

  useEffect(() => {
    // fetch car details
    rentApi.common
      .getRentCarDetails(carId)
      .then((res) => setCar(res.data))
      .catch((err) => {});

    // fetch similar products
  }, []);

  const handleRentCar = () => {
    alert("rent");
  };

  const handleNext = () => {
    if (pages.current === pages.count) return;
    setPages({ ...pages, current: pages.current + 1 });
    scroll.scrollToTop();
  };

  const handlePrev = () => {
    if (pages.current === 1) return;
    setPages({ ...pages, current: pages.current - 1 });
    scroll.scrollToTop();
  };

  if (!car) return null;

  return (
    <Container>
      <Content>
        <Gallery images={car.photos} />
        {pages.current == "1" ? (
          <Details1 car={car} onNext={handleNext} />
        ) : pages.current == "2" ? (
          <Details2 car={car} onNext={handleNext} onPrev={handlePrev} />
        ) : pages.current == "3" ? (
          <Details3 car={car} onPrev={handlePrev} onComplete={handleRentCar} />
        ) : null}
      </Content>

      {!!similarCars.length && (
        <ItemsSection type="slider" title={i18n("similarProducts")}>
          {similarCars.map((car) => (
            <RentCar key={car._id} data={car} />
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
  gap: 100px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;

  @media screen and (max-width: 870px) {
    flex-direction: column;
  }
`;

export default RentCarDetails;
