import { useState } from "react";
import styled from "styled-components";

const Gallery = ({ images: imageURLs = [] }) => {
  const [images, setImages] = useState(
    imageURLs.map((img, index) => ({ url: img, selected: index === 0 }))
  );

  const getSelectedImage = () => {
    const index = images.findIndex((img) => img.selected);
    return images[index];
  };

  const getUnselectedImages = () => {
    return images.filter((img) => !img.selected);
  };

  const handleSelectImage = (imageURL) => {
    const newImages = images.map((img) => ({
      ...img,
      selected: img.url === imageURL,
    }));
    setImages(newImages);
  };

  return (
    <Container>
      <SelectedImage src={getSelectedImage().url} alt="a red car" />

      <ImagesBar>
        {getUnselectedImages().map((img, index) => (
          <BarImage
            key={index}
            src={img.url}
            alt="a red car"
            onClick={() => handleSelectImage(img.url)}
          />
        ))}
      </ImagesBar>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  max-width: 683px;

  img {
    cursor: pointer;
  }

  @media screen and (max-width: 870px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const SelectedImage = styled.img`
  width: 100%;
  height: 55%;
  object-fit: cover;
  border: 1px solid #ccc;
`;

const ImagesBar = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
`;

const BarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ccc;
  transition-duration: 176ms;

  :hover {
    transform: scale(0.99);
  }

  :active {
    transform: scale(0.97);
  }
`;

export default Gallery;
