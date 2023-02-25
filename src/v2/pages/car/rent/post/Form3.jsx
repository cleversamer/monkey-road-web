import styled from "styled-components";
import CustomInput from "v2/components/common/custom-input";
import useLocale from "v2/hooks/useLocale";

const Form3 = ({ context, onImagesChange, onDeleteImage }) => {
  const { i18n } = useLocale();

  return (
    <>
      <TitleContainer>
        <Title>{i18n("uploadCarImages")}</Title>
        <BreakLine />
      </TitleContainer>

      <InputsContainer>
        <InputsRow>
          <ImageInputContainer>
            <CustomInput type="image" onChange={onImagesChange} />
          </ImageInputContainer>

          <SelectedImages>
            {context.images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`car ${index + 1}`}
                onClick={() => onDeleteImage(index)}
              />
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
  align-items: center;
  gap: 12px;
`;

const ImageInputContainer = styled.div`
  flex: 0.25;
`;

const SelectedImages = styled.ul`
  flex: 0.75;
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
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  border: 1px solid #fe7777;
`;

export default Form3;
