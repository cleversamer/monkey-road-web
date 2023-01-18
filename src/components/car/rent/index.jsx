import styled from "styled-components";
import CustomButton from "components/common/custom-button";
import ReusableCar from "..";

const RentCar = ({ data }) => {
  const handleRent = () => {};

  return (
    <ReusableCar data={data}>
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
