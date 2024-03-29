import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "v2/components/car";
import useLocale from "v2/hooks/useLocale";

const OfficeOrder = ({ data, onViewOfficeDetails }) => {
  const { i18n, lang } = useLocale();

  return (
    <ReusableCar
      onClick={onViewOfficeDetails}
      brandName={data.rentCar.brand.name[lang]}
      imageURL={data.rentCar.photos[0]}
      model={data.rentCar.model}
      name={data.rentCar.name}
      year={data.rentCar.year}
    >
      <CTAContainer>
        <CustomButton
          type="primary"
          onClick={onViewOfficeDetails}
          title={i18n("officeDetails")}
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
  top: 7px;
  right: 7px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  padding: 5px;
  border-radius: 6px;
  background-color: ${({ status }) =>
    ["pending", "approved", "paid"].includes(status)
      ? "#FFA500"
      : status === "delivered"
      ? "#1A8331"
      : "#f00"};
`;

export default OfficeOrder;
