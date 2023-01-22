import { useState } from "react";
import styled from "styled-components";

const testImages = [
  { _id: 1, url: "/assets/images/about-us.svg", selected: true },
  { _id: 2, url: "/assets/images/car.jpg", selected: false },
  { _id: 3, url: "/assets/images/car.jpg", selected: false },
  { _id: 4, url: "/assets/images/car.jpg", selected: false },
  { _id: 5, url: "/assets/images/car.jpg", selected: false },
  { _id: 6, url: "/assets/images/car.jpg", selected: false },
];

const Gallery = () => {
  const [images, setImages] = useState(testImages);

  const getSelectedImage = () => {
    const SelectedImageIndex = images.findIndex((img) => img.selected);
    return images[SelectedImageIndex].url;
  };

  const getUnselectedImages = () => images.filter((img) => !img.selected);

  const handleSelectImage = (imageURL) => {
    const newImages = images.map((img) => ({ ...img, selected: false }));
    const newSelectedImageIndex = newImages.findIndex(
      (img) => img.url === imageURL
    );
    newImages[newSelectedImageIndex].selected = true;
    setImages(newImages);
  };

  return (
    <Container>
      <SelectedImage src={getSelectedImage()} alt="a red car" />

      <ImagesBar>
        {getUnselectedImages().map((img) => (
          <BarImage
            key={img._id}
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
