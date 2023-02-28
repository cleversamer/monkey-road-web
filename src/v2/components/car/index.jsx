import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import useAuth from "v2/auth/useAuth";

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
          {!!price && (
            <CarPriceContainer lang={lang}>
              <CarPrice>{parseInt(price).toLocaleString()}</CarPrice>
              <Currency>{i18n("aed")}</Currency>
            </CarPriceContainer>
          )}
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
  border-radius: 16px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
`;

const Image = styled.div`
  background-image: ${({ url }) => `url(${url})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 178px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
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
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
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
