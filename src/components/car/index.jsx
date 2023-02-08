import styled from "styled-components";

const ReusableCar = ({
  imageURL,
  name,
  price,
  brandName,
  model,
  year,
  onClick,
  children,
}) => {
  const mapImage = (url) => `https://191.101.229.249${url}`;

  return (
    <Container>
      <Image url={mapImage(imageURL)} onClick={onClick} />

      <InfoContaier>
        <Row1>
          <CarName>{name}</CarName>
          <CarPrice>
            {parseInt(price).toLocaleString()} <Currency>AED</Currency>
          </CarPrice>
        </Row1>

        <Row2>
          <CarBrand>{brandName}</CarBrand>
          <CarModel>{model}</CarModel>
          <CarYear>{year}</CarYear>
        </Row2>
      </InfoContaier>

      {children}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0px 5px 7px rgba(254, 119, 119, 0.25);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  width: 100%;
  max-width: 350px;
`;

const Image = styled.div`
  background-image: ${({ url }) => `url(${url})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 178px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    transform: scale(1.01);
  }

  :active {
    transform: scale(1);
  }
`;

const InfoContaier = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #ababab;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Row1 = styled(Row)``;

const CarName = styled.h5`
  font-weight: 700;
  font-size: 18px;
  text-transform: capitalize;
`;

const CarPrice = styled.h5`
  font-size: 15px;

  &,
  * {
    font-weight: 700;
    color: #747474;
  }
`;

const Currency = styled.sub``;

const Row2 = styled(Row)`
  justify-content: flex-start;
  gap: 12px;

  * {
    color: #747474;
  }
`;

const CarBrand = styled.h5``;

const CarModel = styled.h5``;

const CarYear = styled.h5``;

export default ReusableCar;
