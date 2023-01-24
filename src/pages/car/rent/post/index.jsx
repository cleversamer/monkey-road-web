import { useState, useEffect } from "react";
import styled from "styled-components";
import carsData from "static/carsData";
import CustomButton from "components/common/custom-button";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

const testBrands = [
  { name: { en: "Brand 1", ar: "براند 1" } },
  { name: { en: "Brand 2", ar: "براند 2" } },
  { name: { en: "Brand 3", ar: "براند 3" } },
];

const PostRentCarForm = ({ activeLevel, onNext, onPrev }) => {
  const [entries, setEntries] = useState({
    colors: carsData.colors,
    brands: testBrands,
    years: carsData.years,
  });

  const [context, setContext] = useState({
    carName: "",
    model: "",
    colorIndex: 0,
    brandIndex: 0,
    yearIndex: 0,
    dailyPrice: 0,
    weeklyPrice: 0,
    monthlyPrice: 0,
    deposit: 0,
    description: "",
    images: [],
  });

  useEffect(() => {
    // fetch brands
  }, []);

  useEffect(() => {
    console.log("context", context);
  }, [context]);

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
        />
      ) : activeLevel == "2" ? (
        <Form2 context={context} onKeyChange={handleKeyChange} />
      ) : activeLevel == "3" ? (
        <Form3
          context={context}
          onImagesChange={handleImagesChange}
          onDeleteImage={handleDeleteImage}
        />
      ) : null}

      <ButtonsContainer>
        <CustomButton type="primary" title="prev" onClick={onPrev} />
        <CustomButton type="primary" title="next" onClick={onNext} />
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
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export default PostRentCarForm;
