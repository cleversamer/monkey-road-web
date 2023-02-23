import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v1/components/common/custom-button";
import ReusableCar from "../index";
import useLocale from "v1/hooks/useLocale";
import useAuth from "v1/auth/useAuth";

const PendingRentCar = ({ data }) => {
  const { user } = useAuth();
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();

  const handleAccept = () => {
    //
  };

  const handleViewDetails = () => {
    //
  };

  return (
    <ReusableCar
      brandName={data.brand.name[lang]}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      price={data.price.daily}
      year={data.year}
      onClick={handleViewDetails}
    >
      {user && user.verified.email && (
        <CTAContainer>
          <CustomButton
            type="primary"
            title={i18n("accept")}
            onClick={handleAccept}
          />

          <CustomButton
            type="primary"
            title={i18n("viewDetails")}
            onClick={handleViewDetails}
          />
        </CTAContainer>
      )}
    </ReusableCar>
  );
};

const CTAContainer = styled.div`
  padding: 10px 5px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  > * {
    height: 32px;
    font-size: 14px;
  }
`;

export default PendingRentCar;
