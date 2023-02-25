import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";

const Details2 = ({ car, order, onPrev, onNext }) => {
  const { i18n, lang } = useLocale();

  return (
    <Container lang={lang}>
      <TitleContainer lang={lang}>
        <CarTitle>{car.name}</CarTitle>
      </TitleContainer>

      <InputsContainer lang={lang}>
        <InputsTitle>{i18n("rentInfo")}</InputsTitle>

        <InputsRow1 lang={lang}>
          <CustomInput type="date" title={i18n("startRent")} />
          <CustomInput type="time" title={i18n("startTime")} />
        </InputsRow1>

        <InputsRow2 lang={lang}>
          <CustomInput type="date" title={i18n("endRent")} />
          <CustomInput type="time" title={i18n("endTime")} />
        </InputsRow2>

        <InputsRow3 lang={lang}>
          <CustomInput
            type="text"
            disabled
            title={i18n("rentDays")}
            value="1"
          />

          <CustomInput
            type="price"
            disabled
            title={i18n("totalPrice")}
            value="1"
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

  > * {
    width: 30%;
  }
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
