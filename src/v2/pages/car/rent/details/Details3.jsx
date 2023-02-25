import styled from "styled-components";
// import GoogleMap from "components/google-map";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";
import CustomInput from "v2/components/common/custom-input";

const Details3 = ({ car, onPrev, onComplete }) => {
  const { i18n, lang } = useLocale();

  return (
    <Container>
      <TitleContainer lang={lang}>
        <CarTitle>{car.name}</CarTitle>
      </TitleContainer>

      {/* <GoogleMap /> */}

      <CustomInput
        type="text"
        title={i18n("location")}
        placeholder={i18n("location")}
        disabled
      />

      <InputsRow>
        <CustomInput
          type="text"
          title={i18n("recipientName")}
          placeholder={i18n("recipientName")}
        />

        <CustomInput type="phone" title={i18n("phoneNumber")} />
      </InputsRow>

      <CTAContainer lang={lang}>
        <CustomButton title={i18n("prev")} type="primary" onClick={onPrev} />

        <CustomButton
          title={i18n("placeOrder")}
          type="primary"
          onClick={onComplete}
        />
      </CTAContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;

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

const InputsRow = styled.div`
  display: flex;
  gap: 20px;
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 15px;

  > button {
    max-width: 220px;
  }
`;

export default Details3;
