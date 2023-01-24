import styled from "styled-components";
import CustomInput from "components/common/custom-input";

const Form3 = ({ context, onImagesChange, onDeleteImage }) => {
  return (
    <>
      <FormTitle>Upload car images</FormTitle>

      <CustomInput type="image" onChange={onImagesChange} />

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
    </>
  );
};

const FormTitle = styled.h3`
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SelectedImages = styled.ul`
  width: 100%;
  height: 200px;
  list-style: none;
  background-color: #fff;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 80px);
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
