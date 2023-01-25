import { useState, useEffect } from "react";
import styled from "styled-components";
import carsData from "static/carsData";
import CustomButton from "components/common/custom-button";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";

const testBrands = [
  { name: { en: "Brand 1", ar: "براند 1" } },
  { name: { en: "Brand 2", ar: "براند 2" } },
  { name: { en: "Brand 3", ar: "براند 3" } },
];

const PostRentCarForm = ({ activeLevel, noOfLevels, onNext, onPrev }) => {
  const [entries, setEntries] = useState({
    colors: carsData.colors,
    brands: testBrands,
    years: carsData.years,
    trimLevels: carsData.trimLevels,
    vehicleTypes: carsData.vehicleTypes,
    fuelTypes: carsData.fuelTypes,
    seatsNumbers: carsData.seatsNumbers,
  });

  const [context, setContext] = useState({
    carName: "",
    vinNumber: "",
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
    phoneNSN: 0,
    description: "",
    images: [],
    paymentMethod: "debit",
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
    postalCode: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    // fetch brands
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
      setContext({ ...context, [key]: newValue });
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

      setContext({ ...context, images: newImages });
    };
  };

  const handleDeleteImage = (imageIndex) => {
    if (imageIndex >= context.images.length) return;
    const newImages = [...context.images];
    newImages.splice(imageIndex, 1);
    setContext({ ...context, images: newImages });
  };

  const colorParser = (color) => color.en;

  const brandParser = (brand) => brand.name.en;

  const yearParser = (year) => year;

  const trimLevelParser = (trimLevel) => trimLevel;

  const vehicleTypeParser = (vehicleType) => vehicleType.en;

  const fuelTypeParser = (fuelType) => fuelType.en;

  const seatsNumberPaeser = (seatNumber) => seatNumber;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send post request
  };

  return (
    <Container onSubmit={handleSubmit}>
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

      <ButtonsContainer>
        {activeLevel !== 1 && (
          <CustomButton type="primary" title="prev" onClick={onPrev} />
        )}
        <CustomButton
          type="primary"
          title={activeLevel === noOfLevels ? "Complete" : "next"}
          onClick={onNext}
        />
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.form`
  width: 100vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
  }

  @media screen and (max-width: 480px) {
    max-width: 300px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export default PostRentCarForm;
