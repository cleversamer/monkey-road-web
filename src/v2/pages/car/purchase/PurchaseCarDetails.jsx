import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Gallery from "v2/components/car-details/Gallery";
import Details from "v2/components/car-details/purchase";
import purchaseApi from "v2/api/car/purchase";
import useLocale from "v2/hooks/useLocale";

const PurchaseCarDetails = () => {
  const { lang } = useLocale();
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    purchaseApi.common
      .getPurchaseCarDetails(carId)
      .then((res) => setCar(res.data));
  }, []);

  if (!car) {
    // TODO
    return null;
  }

  return (
    <Container>
      <Content lang={lang}>
        <Gallery images={car.photos} />
        <Details car={car} />
      </Content>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
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
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  gap: 40px;
  max-height: max-content;

  @media screen and (max-width: 870px) {
    flex-direction: column;
  }
`;

export default PurchaseCarDetails;
