import { useState, useEffect } from "react";
import styled from "styled-components";
import carsData from "v2//static/carsData";
import CustomButton from "v2//components/common/custom-button";
import Loader from "v2//components/loader";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import brandsApi from "v2//api/car/brands";
import purchaseApi from "v2//api/car/purchase";
import useLocale from "v2//hooks/useLocale";

const PostPurchaseCarForm = ({
  activeLevel,
  noOfLevels,
  onViewPopup,
  onNext,
  onPrev,
}) => {
  const { i18n, lang } = useLocale();
  const [entries, setEntries] = useState({
    colors: carsData.colors,
    brands: [],
    years: carsData.years,
    trimLevels: carsData.trimLevels,
    vehicleTypes: carsData.vehicleTypes,
    fuelTypes: carsData.fuelTypes,
    seatsNumbers: carsData.seatsNumbers,
  });

  const [context, setContext] = useState({
    carName: "",
    vin: "",
    model: "",
    brandIndex: 0,
    yearIndex: 0,
    colorIndex: 0,
    trimLevelIndex: 0,
    vehicleTypeIndex: 0,
    fuelTypeIndex: 0,
    noOfSeatsIndex: 0,
    kiloPerHour: 95,
    price: 0,
    phoneICC: "",
    phoneNSN: "",
    description: "",
    images: [],
    paymentMethod: "debit",
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
    postalCode: "",
    month: "",
    year: "",
    error: "",
    submitting: false,
  });

  useEffect(() => {
    brandsApi.common
      .getPopularBrands()
      .then((res) => {
        setEntries({ ...entries, brands: res.data.brands });
      })
      .catch(() => {});
  }, []);

  const handleKeyChange = (key) => (e) => {
    try {
      const value = e.target.value;
      const newValue =
        !value && typeof context[key] === "number"
          ? 0
          : !value && typeof context[key] === "string"
          ? ""
          : typeof context[key] === "number"
          ? parseInt(value)
          : value;
      setContext({ ...context, [key]: newValue, error: "" });
    } catch (err) {}
  };

  const handleImagesChange = (e) => {
    const image = e.target.files[0];
    if (!image || context.images.length === 6) {
      // Show warning
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const newImages = [
        ...context.images,
        { value: image, url: reader.result },
      ];

      setContext({ ...context, images: newImages, error: "" });
    };
  };

  const handleDeleteImage = (imageIndex) => {
    if (imageIndex >= context.images.length) return;
    const newImages = [...context.images];
    newImages.splice(imageIndex, 1);
    setContext({ ...context, images: newImages });
  };

  const colorParser = (color) => color[lang];

  const brandParser = (brand) => brand?.name[lang] || "Loading...";

  const yearParser = (year) => year;

  const trimLevelParser = (trimLevel) => trimLevel;

  const vehicleTypeParser = (vehicleType) => vehicleType[lang];

  const fuelTypeParser = (fuelType) => fuelType[lang];

  const seatsNumberPaeser = (seatNumber) => seatNumber;

  const handleSubmit = async (e) => {
    let error = "";

    try {
      e.preventDefault();

      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const {
        carName,
        vin,
        model,
        brandIndex,
        yearIndex,
        colorIndex,
        trimLevelIndex,
        vehicleTypeIndex,
        fuelTypeIndex,
        noOfSeatsIndex,
        kiloPerHour,
        price,
        phoneICC,
        phoneNSN,
        description,
        images,
      } = context;

      const body = {
        carName,
        vin,
        model,
        brandId: entries.brands[brandIndex]._id,
        year: entries.years[yearIndex],
        colorEN: entries.colors[colorIndex].en,
        colorAR: entries.colors[colorIndex].ar,
        trimLevel: entries.trimLevels[trimLevelIndex],
        vehicleTypeEN: entries.vehicleTypes[vehicleTypeIndex].en,
        vehicleTypeAR: entries.vehicleTypes[vehicleTypeIndex].ar,
        fuelTypeEN: entries.fuelTypes[fuelTypeIndex].en,
        fuelTypeAR: entries.fuelTypes[fuelTypeIndex].ar,
        noOfSeats: entries.seatsNumbers[noOfSeatsIndex],
        kiloPerHour,
        price,
        phoneICC,
        phoneNSN,
        description,
      };

      for (let i = 1; i <= images.length; i++) {
        body["photo" + i] = images[i - 1].value;
      }

      await purchaseApi.common.postPurchaseCar(body);
      onViewPopup();
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
    } finally {
      setContext({ ...context, submitting: false, error });
    }
  };

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      {activeLevel == "1" ? (
        <Form1
          entries={entries}
          context={context}
          onKeyChange={handleKeyChange}
          colorParser={colorParser}
          brandParser={brandParser}
          yearParser={yearParser}
          trimLevelParser={trimLevelParser}
          vehicleTypeParser={vehicleTypeParser}
          fuelTypeParser={fuelTypeParser}
          seatsNumberPaeser={seatsNumberPaeser}
        />
      ) : activeLevel == "2" ? (
        <Form2 context={context} onKeyChange={handleKeyChange} />
      ) : activeLevel == "3" ? (
        <Form3
          context={context}
          onImagesChange={handleImagesChange}
          onDeleteImage={handleDeleteImage}
        />
      ) : activeLevel == "4" ? (
        <Form4 context={context} onKeyChange={handleKeyChange} />
      ) : null}

      {!!context.error && <ErrorText>{context.error}</ErrorText>}

      {context.submitting ? (
        <Loader />
      ) : (
        <ButtonsContainer lang={lang}>
          {activeLevel !== 1 && (
            <CustomButton
              type="primary"
              title={i18n("prev")}
              onClick={onPrev}
            />
          )}

          <CustomButton
            type="primary"
            title={activeLevel === noOfLevels ? i18n("complete") : i18n("next")}
            onClick={activeLevel === noOfLevels ? handleSubmit : onNext}
          />
        </ButtonsContainer>
      )}
    </Container>
  );
};

const Container = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  padding: 20px;

  button {
    width: 45vw;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 10px;
  }

  @media screen and (max-width: 480px) {
    width: calc(100vw - 40px);
  }
`;

const ButtonsContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
`;

export default PostPurchaseCarForm;
