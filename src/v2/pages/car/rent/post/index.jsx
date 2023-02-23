import { useState, useEffect } from "react";
import styled from "styled-components";
import carsData from "v2/static/carsData";
import CustomButton from "v2/components/common/custom-button";
import Loader from "v2/components/loader";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import rentApi from "v2/api/car/rent";
import brandsApi from "v2/api/car/brands";
import useLocale from "v2/hooks/useLocale";

const PostRentCarForm = ({
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

      setContext({ ...context, images: newImages });
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

  const handleSubmit = async (e) => {
    let error = "";

    try {
      e.preventDefault();

      if (context.submitting) return;

      setContext({ ...context, submitting: true });

      const {
        carName,
        model,
        colorIndex,
        brandIndex,
        yearIndex,
        dailyPrice,
        weeklyPrice,
        monthlyPrice,
        deposit,
        description,
        images,
      } = context;
      const body = {
        carName,
        model,
        colorEN: entries.colors[colorIndex].en,
        colorAR: entries.colors[colorIndex].ar,
        brandId: entries.brands[brandIndex]._id,
        year: entries.years[yearIndex],
        dailyPrice,
        weeklyPrice,
        monthlyPrice,
        deposit,
        description,
      };

      for (let i = 1; i <= images.length; i++) {
        body["photo" + i] = images[i - 1].value;
      }

      await rentApi.office.postRentCar(body);
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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const ErrorText = styled.span`
  color: #f00;
  font-size: 13px;
  font-weight: 500;
`;

export default PostRentCarForm;
