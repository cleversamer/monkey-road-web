import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";
import DetailsItem from "./DetailsItem";
import DetailsTitle from "./DetailsTitle";
import useAuth from "v2/auth/useAuth";
import Price from "./Price";

const RentCarDetails = ({ car, onNext, onAccept, onReject }) => {
  const { user } = useAuth();
  const { i18n, lang } = useLocale();

  return (
    <Container>
      <TitleContainer lang={lang}>
        <CarTitle>{car.name}</CarTitle>

        <IconsContainer>
          <CustomButton type="share" />
        </IconsContainer>
      </TitleContainer>

      <RowContainer>
        <DetailsTitle title={i18n("prices")} />

        <PricesList lang={lang}>
          <Price period={i18n("day")} amount={car.price.daily} />
          <Price period={i18n("week")} amount={car.price.weekly} />
          <Price period={i18n("month2")} amount={car.price.monthly} />
          <Price period={i18n("deposit")} amount={car.price.deposit} />
        </PricesList>
      </RowContainer>

      {!!car.description && (
        <>
          <RowContainer>
            <DetailsTitle title={i18n("description")} />
            <CarDescription lang={lang}>{car.description}</CarDescription>
          </RowContainer>
        </>
      )}

      <RowContainer>
        <DetailsTitle title={i18n("details")} />

        <DetailsList lang={lang}>
          <DetailsItem title={i18n("carModel")} value={car.model} />
          <HorizontalLine />
          <DetailsItem title={i18n("yearModel")} value={car.year} />
          <HorizontalLine />
          <DetailsItem title={i18n("brand")} value={car.brand.name[lang]} />
          <HorizontalLine />
          <DetailsItem title={i18n("color")} value={car.color[lang]} />
        </DetailsList>
      </RowContainer>

      {user && user.verified.email && (
        <RentButtonContainer>
          {user.role !== "admin" && (
            <CustomButton
              type="primary"
              title={i18n("rentNow")}
              onClick={onNext}
            />
          )}

          {user.role === "admin" && !car.accepted && (
            <>
              <CustomButton
                type="primary"
                title={i18n("accept")}
                onClick={onAccept}
              />

              <CustomButton
                type="primary"
                title={i18n("reject")}
                onClick={onReject}
              />
            </>
          )}
        </RentButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 870px) {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;
`;

const CarTitle = styled.h3`
  font-weight: 600;
  font-size: 28px;
  text-transform: capitalize;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > svg {
    cursor: pointer;
    background-color: #fff;
    padding: 4px;
    box-sizing: content-box;
    border-radius: 50%;
  }
`;

const PricesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 25px;
`;

const RowContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CarDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  text-align: justify;
  color: #000000;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const DetailsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 22px;
  background-color: #fe7777;
  width: fit-content;
  padding: 20px;
  border-radius: 8px;
`;

const HorizontalLine = styled.span`
  border: 1px solid #fff;
`;

const RentButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;

  button {
    max-width: 170px;
  }
`;

export default RentCarDetails;
