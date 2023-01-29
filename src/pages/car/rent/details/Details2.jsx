import styled from "styled-components";
import CustomInput from "components/common/custom-input";
import CustomButton from "components/common/custom-button";

const Details2 = ({ order, onPrev, onNext }) => {
  return (
    <Container>
      <TitleContainer>
        <CarTitle>Car name</CarTitle>
        <CarPricePerDay>1000 AED / day</CarPricePerDay>
      </TitleContainer>

      <BreakLine />

      <InputsContainer>
        <InputsTitle>Delivery information</InputsTitle>

        <InputsRow1>
          <CustomInput type="date" title="from" />

          <CustomInput
            type="text"
            title="NO. of days"
            placeholder="NO. of days"
          />
        </InputsRow1>

        <InputsRow2>
          <CustomInput type="time" title="time" />
        </InputsRow2>
      </InputsContainer>

      <CTAContainer>
        <CustomButton title="prev" type="primary" onClick={onPrev} />
        <CustomButton title="continue" type="primary" onClick={onNext} />
      </CTAContainer>
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
  justify-content: space-between;
  align-items: center;
`;

const CarTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  text-transform: capitalize;
`;

const CarPricePerDay = styled.h3`
  font-weight: 600;
  font-size: 20px;
  text-transform: capitalize;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

const InputsContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputsTitle = styled.h4`
  text-transform: capitalize;
`;

const InputsRow = styled.div`
  display: flex;
  gap: 20px;

  > * {
    width: 30%;
  }
`;

const InputsRow1 = styled(InputsRow)``;

const InputsRow2 = styled(InputsRow)``;

const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  > button {
    max-width: 220px;
  }
`;

export default Details2;
