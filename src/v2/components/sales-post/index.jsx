import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "v2/components/car";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";

const SalesPost = ({ data, onMarkCarAsSold }) => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();

  const navigateToDetails = () =>
    navigate(routes.purchaseCarDetails.navigate(data._id));

  return (
    <ReusableCar
      onClick={navigateToDetails}
      brandName={data.brand.name[lang]}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      price={data.price}
      year={data.year}
    >
      <>
        <CTAContainer>
          {!data.sold && (
            <CustomButton
              type="primary"
              onClick={onMarkCarAsSold}
              title={i18n("markAsSold")}
            />
          )}

          <CustomButton
            type="primary"
            onClick={navigateToDetails}
            title={i18n("viewDetails")}
          />
        </CTAContainer>

        <Badge sold={data.sold}>
          {data.sold ? i18n("sold") : i18n("notSold")}
        </Badge>
      </>
    </ReusableCar>
  );
};

const CTAContainer = styled.div`
  padding: 10px 5px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  gap: 10px;

  > * {
    height: 32px;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
  background-color: ${({ sold }) => (sold ? "#1A8331" : "#FFA500")};
  padding: 3px 15px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

export default SalesPost;
