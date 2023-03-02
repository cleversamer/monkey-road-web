import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "v2/components/car";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";

const PurchaseCar = ({ data }) => {
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
      <CTAContainer>
        <CustomButton
          type="primary"
          onClick={navigateToDetails}
          title={i18n("viewDetails")}
        />
      </CTAContainer>
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

export default PurchaseCar;
