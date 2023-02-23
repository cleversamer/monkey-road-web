import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";
import DetailsItem from "./DetailsItem";
import DetailsTitle from "./DetailsTitle";
import useAuth from "v2/auth/useAuth";

const RentCarDetails = ({ car, onNext }) => {
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

      <BreakLine />

      <DetailsList>
        <DetailsTitle title={i18n("price")} />

        <DetailsItem
          leftTitle={i18n("dailyPrice")}
          rightTitle={`${car.price.daily} ${i18n("aed")}`}
        />

        <BreakLine />

        <DetailsItem
          leftTitle={i18n("weeklyPrice")}
          rightTitle={`${car.price.weekly} ${i18n("aed")}`}
        />

        <BreakLine />

        <DetailsItem
          leftTitle={i18n("monthlyPrice")}
          rightTitle={`${i18n("aed")} ${car.price.monthly}`}
        />

        <BreakLine />

        <DetailsItem
          leftTitle={i18n("deposit")}
          rightTitle={`${car.price.deposit} ${i18n("aed")}`}
        />
      </DetailsList>

      <BreakLine />

      {!!car.description && (
        <>
          <DetailsList>
            <DetailsTitle title={i18n("description")} />
            <CarDescription>{car.description}</CarDescription>
          </DetailsList>

          <BreakLine />
        </>
      )}

      <DetailsList>
        <DetailsTitle title={i18n("details")} />

        <DetailsItem leftTitle={i18n("carModel")} rightTitle={car.model} />

        <BreakLine />

        <DetailsItem leftTitle={i18n("yearModel")} rightTitle={car.year} />

        <BreakLine />

        <DetailsItem
          leftTitle={i18n("brand")}
          rightTitle={car.brand.name[lang]}
        />

        <BreakLine />

        <DetailsItem leftTitle={i18n("color")} rightTitle={car.color[lang]} />

        <BreakLine />
      </DetailsList>

      {user && user.verified.email && (
        <RentButtonContainer>
          <CustomButton
            type="primary"
            title={i18n("rentNow")}
            onClick={onNext}
          />
        </RentButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;

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

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

const DetailsList = styled.ul`
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
`;

const RentButtonContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export default RentCarDetails;
