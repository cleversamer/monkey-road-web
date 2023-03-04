import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "../index";
import useLocale from "v2/hooks/useLocale";
import useAuth from "v2/auth/useAuth";
import { routes } from "v2/client";

const PendingRentCar = ({ data, onAccept }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { i18n, lang } = useLocale();

  const handleViewDetails = () => {
    navigate(routes.rentCarDetails.navigate(data._id));
  };

  return (
    <ReusableCar
      brandName={data.brand.name[lang]}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      year={data.year}
      onClick={handleViewDetails}
    >
      {user && user.verified.email && (
        <CTAContainer>
          <CustomButton
            type="primary"
            title={i18n("accept")}
            onClick={onAccept}
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
  display: flex;
  align-items: center;
  gap: 10px;

  > * {
    height: 32px;
    font-size: 14px;
  }
`;

export default PendingRentCar;
