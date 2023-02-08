import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "components/common/custom-button";
import ReusableCar from "..";
import { routes } from "client";

const RentCar = ({ data }) => {
  const navigate = useNavigate();

  const handleRent = () => navigate(routes.rentCarDetails.navigate(data._id));

  return (
    <ReusableCar
      brandName={data.brand.name.en}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      price={data.price.daily}
      year={data.year}
      onClick={handleRent}
    >
      <CTAContainer>
        <CustomButton type="primary" title="Rent now" onClick={handleRent} />
      </CTAContainer>
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

export default RentCar;
