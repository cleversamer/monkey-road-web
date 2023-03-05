import { useState } from "react";
import styled from "styled-components";
import SecretarySidebar from "v2/components/secretary/sidebar";
import useLocale from "v2/hooks/useLocale";
import CustomInput from "v2/components/common/custom-input";
import CustomButton from "v2/components/common/custom-button";
import brandsApi from "v2/api/car/brands";
import Loader from "v2/components/loader";

const SecretaryAddBrand = () => {
  const { i18n, lang } = useLocale();
  const [context, setContext] = useState({
    nameEN: "",
    nameAR: "",
    image: { value: null, url: "" },
    submitting: false,
  });

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setContext({ ...context, image: { value: image, url: reader.result } });
    };
  };

  const handleClearImage = () =>
    setContext({ ...context, image: { value: null, url: "" } });

  const handleAddBrand = async () => {
    try {
      setContext({ ...context, submitting: true });

      const data = {
        nameEN: context.nameEN,
        nameAR: context.nameAR,
        photo: context.image.value,
      };

      await brandsApi.admin.addBrand(data);

      setContext({
        nameEN: "",
        nameAR: "",
        image: { value: null, url: "" },
        submitting: false,
      });
    } catch (err) {}
  };

  return (
    <Container lang={lang}>
      <SecretarySidebar activeItem="add brand" />

      <Content>
        <PageTitle>{i18n("addBrand")}</PageTitle>

        <FormContainer lang={lang}>
          <ImageContainer>
            {context.image.url ? (
              <Image
                src={context.image.url}
                alt=""
                onClick={handleClearImage}
              />
            ) : (
              <CustomInput type="image" onChange={handleImageChange} />
            )}
          </ImageContainer>

          <InputsContainer>
            <CustomInput
              type="text"
              title={i18n("name")}
              subtitle="English"
              value={context.nameEN}
              onChange={handleKeyChange("nameEN")}
            />

            <CustomInput
              type="text"
              title={i18n("name")}
              subtitle="Arabic"
              value={context.nameAR}
              onChange={handleKeyChange("nameAR")}
            />

            {context.submitting ? (
              <Loader />
            ) : (
              <CustomButton
                type="primary"
                title={i18n("addBrand")}
                onClick={handleAddBrand}
              />
            )}
          </InputsContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PageTitle = styled.h1`
  text-transform: capitalize;
  font-size: 26px;
  font-weight: 600;
  color: #fe7777;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 20px;
`;

const InputsContainer = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    width: fit-content;
    min-width: 120px;
    padding: 0 15px;
  }
`;

const ImageContainer = styled.div`
  flex: 0.3;
  width: 100%;

  div {
    height: 200px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  cursor: pointer;
  border: 1px solid #ababab;
`;

export default SecretaryAddBrand;
