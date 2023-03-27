import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";

const Details2 = ({ car, onPrev, onNext, context, onKeyChange }) => {
  const { i18n, lang } = useLocale();

  const calcTotalPrice = () => {
    const { daily, weekly, monthly, deposit } = car.price;
    const noOfDays = calcNoOfDays();
    const pricePerDay =
      noOfDays < 7 ? daily : noOfDays < 30 ? weekly / 7 : monthly / 30;

    const totalPrice = Math.ceil(noOfDays * pricePerDay + deposit);
    return Math.ceil(totalPrice * 1.025);
  };

  const calcNoOfDays = () => {
    const startDate = new Date(context.startDate);
    const endDate = new Date(context.endDate);
    return Math.round((endDate - startDate) / 1000 / 60 / 60 / 24) || 0;
  };

  return (
    <Container lang={lang}>
      <TitleContainer lang={lang}>
        <CarTitle>{car.name}</CarTitle>
      </TitleContainer>

      <InputsContainer lang={lang}>
        <InputsTitle>{i18n("rentInfo")}</InputsTitle>

        <InputsRow1 lang={lang}>
          <CustomInput
            type="datetime"
            title={i18n("startRent")}
            onChange={onKeyChange("startDate")}
            value={context.startDate}
          />
        </InputsRow1>

        <InputsRow2 lang={lang}>
          <CustomInput
            type="datetime"
            title={i18n("endRent")}
            onChange={onKeyChange("endDate")}
            value={context.endDate}
          />
        </InputsRow2>

        <InputsRow3 lang={lang}>
          <CustomInput
            type="text"
            disabled
            title={i18n("rentDays")}
            value={calcNoOfDays().toLocaleString()}
          />

          <CustomInput
            type="price"
            disabled
            title={i18n("totalPrice")}
            value={calcTotalPrice().toLocaleString()}
          />
        </InputsRow3>
      </InputsContainer>

      <CTAContainer lang={lang}>
        <CustomButton title={i18n("prev")} type="primary" onClick={onPrev} />

        <CustomButton
          title={i18n("continue")}
          type="primary"
          onClick={onNext}
        />
      </CTAContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};

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
  font-size: 20px;
  text-transform: capitalize;
`;

const InputsContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputsTitle = styled.h4`
  text-transform: capitalize;
`;

const InputsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 20px;
`;

const InputsRow1 = styled(InputsRow)``;

const InputsRow2 = styled(InputsRow)``;

const InputsRow3 = styled(InputsRow)``;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 15px;

  > button {
    max-width: 220px;
  }
`;

export default Details2;
