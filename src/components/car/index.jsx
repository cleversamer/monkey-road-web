import styled from "styled-components";
import { serverURL } from "api/client";
import useLocale from "hooks/useLocale";
import useAuth from "auth/useAuth";

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
  const { user } = useAuth();
  const { i18n, lang } = useLocale();

  return (
    <Container>
      <Image url={imageURL} onClick={onClick} />

      <InfoContaier border={user && user.verified.email}>
        <Row1 lang={lang}>
          <CarName>{name}</CarName>
          <CarPriceContainer lang={lang}>
            <CarPrice>{parseInt(price).toLocaleString()}</CarPrice>
            <Currency>{i18n("aed")}</Currency>
          </CarPriceContainer>
        </Row1>

        <Row2 lang={lang}>
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
  ${({ border }) => (border ? "border-bottom: 1px solid #ababab;" : "")}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
`;

const Row1 = styled(Row)``;

const CarName = styled.h5`
  font-weight: 700;
  font-size: 18px;
  text-transform: capitalize;
`;

const CarPriceContainer = styled.h5`
  font-size: 15px;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 6px;

  &,
  * {
    font-weight: 700;
    color: #747474;
  }
`;

const CarPrice = styled.span``;

const Currency = styled.sub`
  align-self: flex-end;
`;

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
