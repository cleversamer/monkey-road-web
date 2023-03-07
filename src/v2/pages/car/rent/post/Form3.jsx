import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import useLocale from "v2/hooks/useLocale";
import { IoClose } from "react-icons/io5";

const Form3 = ({ context, onImagesChange, onDeleteImage }) => {
  const { lang, i18n } = useLocale();

  return (
    <>
      <TitleContainer>
        <Title>{i18n("uploadCarImages")}</Title>
        <BreakLine />
      </TitleContainer>

      <InputsContainer>
        <InputsRow lang={lang}>
          <ImageInputContainer>
            <CustomInput type="image" onChange={onImagesChange} />
          </ImageInputContainer>

          <SelectedImages>
            {context.images.map((image, index) => (
              <ImageContainer>
                <Image key={index} src={image.url} alt={`car ${index + 1}`} />
                <DeleteImageIcon onClick={() => onDeleteImage(index)} />
              </ImageContainer>
            ))}
          </SelectedImages>
        </InputsRow>
      </InputsContainer>
    </>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 24px;
    text-align: center;
  }
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputsRow = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

const ImageInputContainer = styled.div`
  flex: 0.3;

  @media screen and (max-width: 660px) {
    flex: 1;
    width: 100%;
  }
`;

const SelectedImages = styled.ul`
  flex: 0.7;
  width: 100%;
  height: 340px;
  list-style: none;
  background-color: #fff;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 150px);
  grid-gap: 10px;
  align-content: center;
  border-radius: 8px;
  border: 1px solid #fe7777;

  @media screen and (max-width: 660px) {
    flex: 1;
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #fe7777;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;

const DeleteImageIcon = styled(IoClose)`
  position: absolute;
  top: 2px;
  right: 2px;
  fill: #fff;
  font-size: 20px;
  background-color: #fe7777;
  box-sizing: content-box;
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
`;

export default Form3;
