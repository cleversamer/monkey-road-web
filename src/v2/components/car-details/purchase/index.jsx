import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import { BiPhone } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import useLocale from "v2/hooks/useLocale";
import useAuth from "v2/auth/useAuth";
import usersApi from "v2/api/user/users";
import DetailsItem from "./DetailsItem";
import DetailsTitle from "./DetailsTitle";

const PurchaseCarDetails = ({ car }) => {
  const { user, setUser } = useAuth();
  const { i18n, lang } = useLocale();

  const handleMakeCall = () => {};

  const handleWhatsAppCall = () => {};

  const handleLikeClick = async () => {
    try {
      const isLiked = checkIsLiked();

      if (isLiked) {
        const res = await usersApi.common.deleteFromFavorites(car._id);
        const { favorites } = res.data;
        setUser({ ...user, favorites });
        return;
      }

      const res = await usersApi.common.addToFavorites(car._id);
      const { favorites } = res.data;
      setUser({ ...user, favorites });
    } catch (err) {
      //
    }
  };

  const checkIsLiked = () => user?.favorites?.includes(car._id);

  return (
    <Container>
      <IconsContainer>
        <CustomButton
          type="like"
          liked={checkIsLiked()}
          onClick={handleLikeClick}
        />
        <CustomButton type="share" />
      </IconsContainer>

      <TitleContainer>
        <CarTitle>{car.name}</CarTitle>
        <CarPrice>
          {parseInt(car.price).toLocaleString()} {i18n("aed")}
        </CarPrice>
      </TitleContainer>

      {!!car.description && (
        <>
          <RowContainer lang={lang}>
            <DetailsTitle title={i18n("description")} />
            <CarDescription lang={lang}>{car.description}</CarDescription>
          </RowContainer>
        </>
      )}

      <RowContainer lang={lang}>
        <DetailsTitle title={i18n("details")} />

        <DetailsList lang={lang}>
          <DetailsItem title={i18n("carModel")} value={car.model} />
          <HorizontalLine />
          <DetailsItem title={i18n("brand")} value={car.brand.name[lang]} />
          <HorizontalLine />
          <DetailsItem title={i18n("yearModel")} value={car.year} />
        </DetailsList>

        <DetailsList lang={lang}>
          <DetailsItem title={i18n("trimLevel")} value={car.trimLevel} />
          <HorizontalLine />
          <DetailsItem title={i18n("kiloPerHour")} value={car.kiloPerHour} />
          <HorizontalLine />
          <DetailsItem title={i18n("color")} value={car.color[lang]} />
        </DetailsList>
      </RowContainer>

      <ItemOverview>
        <ItemOverviewTitle>{i18n("itemOverview")}</ItemOverviewTitle>

        <ItemContainer>
          <Item>
            <ItemImage
              src="/assets/images/purchase-car/kmph.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>
              {car.kiloPerHour} {i18n("kmph")}
            </ItemTitle>
          </Item>

          <Item>
            <ItemImage
              src="/assets/images/purchase-car/automatic.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>{car.vehicleType[lang]}</ItemTitle>
          </Item>

          <Item>
            <ItemImage
              src="/assets/images/purchase-car/diesel.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>{car.fuelType[lang]}</ItemTitle>
          </Item>

          <Item>
            <ItemImage
              src="/assets/images/purchase-car/seats.svg"
              alt="kilometers per hour icon"
            />

            <ItemTitle>
              {car.noOfSeats} {i18n("seats")}
            </ItemTitle>
          </Item>
        </ItemContainer>
      </ItemOverview>

      <ButtonsContainer>
        <CustomButton
          type="primary"
          onClick={handleMakeCall}
          title={
            <a href={`tel:${car.phoneNumber}`}>
              <CallContainer>
                <BiPhone /> {i18n("callSeller")}
              </CallContainer>
            </a>
          }
        />

        <CustomButton
          type="primary"
          color="#1A8331"
          title={
            <a href={`https://wa.me/${car.phoneNumber}`} target="_blank">
              <CallContainer>
                <AiOutlineWhatsApp /> {i18n("whatsApp")}
              </CallContainer>
            </a>
          }
          onClick={handleWhatsAppCall}
        />
      </ButtonsContainer>
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
  font-size: 24px;
  text-transform: capitalize;
`;

const CarPrice = styled.h3`
  font-weight: 600;
  font-size: 24px;
  text-transform: capitalize;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const RowContainer = styled.ul`
  list-style: none;
  display: flex;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
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
  justify-content: space-between;
  gap: 22px;
  background-color: #fe7777;
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border-radius: 8px;
`;

const HorizontalLine = styled.span`
  border: 1px solid #fff;
`;

const ButtonsContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CallContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;
  svg {
    fill: #fff;
    font-size: 20px;
  }
`;

const ItemOverview = styled.section`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  @media screen and (max-width: 540px) {
    gap: 30px;
  }
`;

const ItemOverviewTitle = styled.h4`
  @media screen and (max-width: 540px) {
    margin: 0 auto;
  }
`;

const ItemContainer = styled.ul`
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

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 100px;
  background-color: #ffcece;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
`;

const ItemImage = styled.img``;

const ItemTitle = styled.h5`
  text-transform: capitalize;
`;

export default PurchaseCarDetails;
