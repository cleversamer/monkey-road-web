import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "v2/components/car";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";

const OfficeOrder = ({ data }) => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();

  const navigateToDetails = () =>
    navigate(routes.purchaseCarDetails.navigate(data.rentCar._id));

  return (
    <ReusableCar
      onClick={navigateToDetails}
      brandName={data.rentCar.brand.name[lang]}
      imageURL={data.rentCar.photos[0]}
      model={data.rentCar.model}
      name={data.rentCar.name}
      year={data.rentCar.year}
    >
      <CTAContainer>
        <CustomButton
          type="primary"
          onClick={navigateToDetails}
          title={i18n("officeDetails")}
        />

        <CustomButton
          type="primary"
          onClick={navigateToDetails}
          title={i18n("viewDetails")}
        />
      </CTAContainer>

      <Badge status={data.status}>{i18n(data.status)}</Badge>
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
  font-size: 13px;
  text-transform: capitalize;
  padding: 5px;
  border-radius: 6px;
  background-color: ${({ status }) =>
    status === "pending"
      ? "orange"
      : ["rejected", "closed"].includes(status)
      ? "red"
      : status === "approved"
      ? "green"
      : "#000"};
`;

export default OfficeOrder;
